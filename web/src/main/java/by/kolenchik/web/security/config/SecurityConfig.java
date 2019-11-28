package by.kolenchik.web.security.config;

import by.kolenchik.web.security.Role;
import by.kolenchik.web.security.jwt.JwtTokenFilterConfigurer;
import by.kolenchik.web.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private JwtTokenProvider jwtTokenProvider;
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public SecurityConfig(
            JwtTokenProvider jwtTokenProvider,
            @Qualifier("Jwt") UserDetailsService userDetailsService
    ) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
    }

    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/css/**").permitAll()
                .antMatchers(HttpMethod.GET, "/js/**").permitAll()

                .antMatchers(HttpMethod.GET, "/").permitAll()

                .antMatchers(HttpMethod.POST, "/dev/login").permitAll()
                .antMatchers(HttpMethod.GET, "/dev/about").permitAll()

                .antMatchers(HttpMethod.GET, "/dev/employees**").permitAll()
                .antMatchers(HttpMethod.GET, "/dev/employees/**").permitAll()
                .antMatchers(HttpMethod.POST, "/dev/employees").permitAll()
                .antMatchers(HttpMethod.DELETE, "/dev/employees").permitAll()
                .antMatchers(HttpMethod.DELETE, "/dev/employees/*").permitAll()
                .antMatchers(HttpMethod.PUT, "/dev/employees/*").permitAll()

                .antMatchers(HttpMethod.GET, "/dev/managers*").permitAll()
                .antMatchers(HttpMethod.GET, "/dev/managers/*").permitAll()
                .antMatchers(HttpMethod.POST, "/dev/managers").permitAll()
                .antMatchers(HttpMethod.DELETE, "/dev/managers").permitAll()
                .antMatchers(HttpMethod.DELETE, "/dev/managers/*").permitAll()
                .antMatchers(HttpMethod.PUT, "/dev/managers/*").permitAll()

                .antMatchers(HttpMethod.GET, "/dev/tasks**").permitAll()
                .antMatchers(HttpMethod.GET, "/dev/tasks/**").permitAll()
                .antMatchers(HttpMethod.POST, "/dev/tasks").permitAll()
                .antMatchers(HttpMethod.DELETE, "/dev/tasks").permitAll()
                .antMatchers(HttpMethod.DELETE, "/dev/tasks/*").permitAll()
                .antMatchers(HttpMethod.PUT, "/dev/tasks/*").permitAll()

                .anyRequest().authenticated();

        http.apply(new JwtTokenFilterConfigurer(jwtTokenProvider));
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}

