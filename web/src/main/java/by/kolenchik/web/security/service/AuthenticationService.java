package by.kolenchik.web.security.service;

import by.kolenchik.web.security.dto.LoginDto;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {

    ResponseEntity login(LoginDto loginDto);
}
