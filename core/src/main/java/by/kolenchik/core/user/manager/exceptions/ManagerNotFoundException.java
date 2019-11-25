package by.kolenchik.core.user.manager.exceptions;

public class ManagerNotFoundException extends RuntimeException {
    public ManagerNotFoundException(String message, Object... args) {
        super(String.format(message, args));
    }
}
