package by.kolenchik.web.security.jwt;

import by.kolenchik.core.user.User;
import by.kolenchik.core.user.repository.UserRepository;
import by.kolenchik.web.security.Role;
import by.kolenchik.web.security.exception.InvalidJwtException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Component
public class JwtTokenProvider {
    private UserRepository userRepository;
    private UserDetailsService userDetailsService;

    @Value("${security.jwt.key}")
    private String key;

    @Value("${security.jwt.token.expiredIn}")
    private long expiredInTime;

    public JwtTokenProvider(UserRepository userRepository, @Qualifier("Jwt") UserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;
    }

    public String createToken(String email, Set<Role> roles) {
        Map<String, Object> header = new HashMap<>();
        header.put("alg", "HS512");
        header.put("typ", "JWT");

        User user = userRepository.findByEmail(email);

        Claims claims = Jwts.claims().setSubject(email);
        claims.put("auth", getRoleNames(roles));
        claims.put("uid", user.getId());
        claims.put("superior", user.getSuperior());

        Date now = new Date();
        Date expiredIn = new Date(now.getTime() + expiredInTime);

        return Jwts.builder()
                .setHeader(header)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiredIn)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());

        } catch (JwtException | IllegalArgumentException e) {
            throw new InvalidJwtException();
        }
    }

    Authentication getAuthentication(String token) {
        String email = getEmail(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    private String getEmail(String token) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();
    }

    String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (bearerToken != null && bearerToken.startsWith("Bearer_")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    private Set<String> getRoleNames(Set<Role> userRoles) {
        Set<String> result = new HashSet<>();

        userRoles.forEach(role -> result.add(role.name()));

        return result;
    }
}
