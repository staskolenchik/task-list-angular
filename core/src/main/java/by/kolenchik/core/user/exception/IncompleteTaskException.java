package by.kolenchik.core.user.exception;

public class IncompleteTaskException extends RuntimeException {
    public IncompleteTaskException(String message, Object... args) {
        super(String.format(message, args));
    }
}
