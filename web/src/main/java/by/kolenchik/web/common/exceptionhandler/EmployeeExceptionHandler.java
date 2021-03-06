package by.kolenchik.web.common.exceptionhandler;

import by.kolenchik.core.user.exception.IncompleteTaskException;
import by.kolenchik.core.user.exception.PasswordsMismatchException;
import by.kolenchik.core.user.exception.UserNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class EmployeeExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(RuntimeException e, WebRequest request) {
        String responseBody = e.getMessage();

        return handleExceptionInternal(e, responseBody, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(IncompleteTaskException.class)
    public ResponseEntity<Object> handleIncompleteTaskException(RuntimeException e, WebRequest request) {
        String responseBody = e.getMessage();

        return handleExceptionInternal(e, responseBody, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(PasswordsMismatchException.class)
    public ResponseEntity<Object> handlePasswordsMismatchException(RuntimeException e, WebRequest request) {
        String responseBody = e.getMessage();

        return handleExceptionInternal(e, responseBody, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}
