package by.kolenchik.core.user.employee.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeInfoDto {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String surname;
    private String patronymic;
    private LocalDate birthDate;
    private String superior;
}
