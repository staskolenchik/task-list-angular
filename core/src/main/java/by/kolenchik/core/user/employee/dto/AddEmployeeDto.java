package by.kolenchik.core.user.employee.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AddEmployeeDto {
    private String email;
    private String name;
    private String surname;
    private String patronymic;
    private String password;
    private LocalDate birthDate;
    private Long managerId;
}
