package by.kolenchik.core.user.exception;

public class PasswordsMismatchException extends RuntimeException {
    public PasswordsMismatchException(String message, Object... args) {
        super(String.format(message, args));
    }
}
