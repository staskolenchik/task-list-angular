package by.kolenchik.web.common.exceptionhandler;

import by.kolenchik.core.user.employee.exceptions.EmployeeNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class EmployeeExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<Object> handleEmployeeNotFoundException(RuntimeException e, WebRequest request) {
        String responseBody = e.getMessage();

        return handleExceptionInternal(e, responseBody, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }
}
