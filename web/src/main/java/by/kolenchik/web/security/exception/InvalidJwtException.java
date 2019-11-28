package by.kolenchik.web.security.exception;

public class InvalidJwtException extends RuntimeException {
    public InvalidJwtException(Throwable t) {
        super("JWT token is expired or invalid", t);
    }

    public InvalidJwtException() {
        super("JWT token is expired or invalid");
    }
}
