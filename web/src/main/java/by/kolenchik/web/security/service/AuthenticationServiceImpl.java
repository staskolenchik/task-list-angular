package by.kolenchik.web.security.service;

import by.kolenchik.core.user.User;
import by.kolenchik.core.user.UserRole;
import by.kolenchik.core.user.repository.UserRepository;
import by.kolenchik.web.security.Role;
import by.kolenchik.web.security.dto.LoginDto;
import by.kolenchik.web.security.jwt.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private JwtTokenProvider jwtTokenProvider;
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;

    public AuthenticationServiceImpl(
            JwtTokenProvider jwtTokenProvider,
            AuthenticationManager authenticationManager,
            UserRepository userRepository
    ) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity login(LoginDto loginDto) {
        try {
            String email = loginDto.getEmail();
            String password = loginDto.getPassword();

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            User user = userRepository.findByEmail(email);

            if (user == null) {
                throw new UsernameNotFoundException(String.format("User with email=%s not found", email));
            }

            Set<UserRole> userRoles = user.getRoles();
            Set<Role> roles = new HashSet<>();

            for (UserRole userRole : userRoles) {
                Role role = Role.valueOf(userRole.getDesignation());
                roles.add(role);
            }

            String token = jwtTokenProvider.createToken(email, roles);

            Map<Object, Object> response = new HashMap<>();
            response.put("email", email);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
