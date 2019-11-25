package by.kolenchik.core.task.exceptions;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(String message, Object... args) {
        super(String.format(message, args));
    }
}
