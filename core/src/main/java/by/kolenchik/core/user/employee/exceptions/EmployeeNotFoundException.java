package by.kolenchik.core.user.employee.exceptions;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(String message, Object... args) {
        super(String.format(message, args));
    }
}
