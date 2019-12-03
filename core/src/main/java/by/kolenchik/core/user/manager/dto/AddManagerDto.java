package by.kolenchik.core.user.manager.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
public class AddManagerDto {
    @NotBlank(message = "User email cannot be empty")
    @Email(message = "User email is not valid")
    @Length(max = 50, message = "User email cannot be more than 50 characters")
    private String email;

    @NotBlank(message = "User name cannot be empty")
    @Length(max = 25, message = "User name cannot be more than 25 characters")
    private String name;

    @NotBlank(message = "User surname cannot be empty")
    @Length(max = 25, message = "User surname cannot be more than 25 characters")
    private String surname;

    @Length(max = 25, message = "User patronymic cannot be more than 25 characters")
    private String patronymic;

    @NotBlank(message = "User password cannot be empty")
    @Length(min = 5, max = 20, message = "User password cannot be less than 5 and more than 20 characters")
    private String password;

    @NotBlank(message = "User confirm password cannot be empty")
    @Length(min = 5, max = 20, message = "User confirm password cannot be less than 5 and more than 20 characters")
    private String confirmPassword;

    @NotBlank(message = "User birth date cannot be empty")
    private LocalDate birthDate;
}
