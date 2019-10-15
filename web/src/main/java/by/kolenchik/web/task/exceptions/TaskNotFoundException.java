package by.kolenchik.web.task.exceptions;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(String errorMessage, Object... objects) {
        super(String.format(errorMessage, objects));
    }
}
