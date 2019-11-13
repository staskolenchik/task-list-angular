package by.kolenchik.core.task.exceptions;

public class TaskTypeUndefinedException extends RuntimeException {
    public TaskTypeUndefinedException(String message, Object... args) {
        super(String.format(message, args));
    }
}
