package by.kolenchik.core.user.employee.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class UpdateEmployeeDto {
    @NotNull(message = "User id cannot be null")
    private Long id;

    @NotBlank(message = "User name cannot be empty")
    @Length(max = 25, message = "User name cannot be more than 25 characters")
    private String name;

    @NotBlank(message = "User surname cannot be empty")
    @Length(max = 25, message = "User surname cannot be more than 25 characters")
    private String surname;

    @Length(max = 25, message = "User patronymic cannot be more than 25 characters")
    private String patronymic;

    @NotNull(message = "User birth date cannot be empty")
    private LocalDate birthDate;

    @NotNull(message = "User's superior cannot be empty")
    private Long superior;
}
