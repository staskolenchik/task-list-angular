package by.kolenchik.web.common.exceptionhandler;

import by.kolenchik.core.comment.exceptions.CommentNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CommentExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(CommentNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(RuntimeException e, WebRequest request) {
        String responseBody = e.getMessage();

        return handleExceptionInternal(e, responseBody, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }
}
