package by.kolenchik.core.user.employee.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateEmployeeDto {

    private Long id;
    private String email;
    private String name;
    private String surname;
    private String patronymic;
    private LocalDate birthDate;
    private Long manager_id;
}
