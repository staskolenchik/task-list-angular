package by.kolenchik.core.user.exception;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(String message, Object... args) {
        super(String.format(message, args));
    }
}
