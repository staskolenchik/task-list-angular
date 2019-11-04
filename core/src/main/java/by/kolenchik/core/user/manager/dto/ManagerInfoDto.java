package by.kolenchik.core.user.manager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ManagerInfoDto {

    private Long id;
    private String email;
    private String name;
    private String surname;
    private String patronymic;
    private LocalDate birthDate;
}
