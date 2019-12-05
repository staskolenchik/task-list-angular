package by.kolenchik.core.user.employee.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class AddEmployeeDto {
    @NotBlank(message = "Employee's email cannot be empty")
    @Email(message = "Employee's email is not valid")
    @Length(max = 50, message = "Employee's email cannot be more than 50 characters")
    private String email;

    @NotBlank(message = "Employee's name cannot be empty")
    @Length(max = 25, message = "Employee's name cannot be more than 25 characters")
    private String name;

    @NotBlank(message = "Employee's surname cannot be empty")
    @Length(max = 25, message = "Employee's surname cannot be more than 25 characters")
    private String surname;

    @Length(max = 25, message = "Employee's patronymic cannot be more than 25 characters")
    private String patronymic;

    @NotBlank(message = "Employee's password cannot be empty")
    @Length(min = 5, max = 20, message = "User password cannot be less than 5 and more than 20 characters")
    private String password;

    @NotBlank(message = "Employee's confirm password cannot be empty")
    @Length(min = 5, max = 20, message = "Employee's confirm password cannot be less than 5 and more than 20 characters")
    private String confirmPassword;

    @NotNull(message = "Employee's birth date cannot be empty")
    private LocalDate birthDate;

    @NotNull(message = "Employee's superior id cannot be null")
    private Long superior;
}
