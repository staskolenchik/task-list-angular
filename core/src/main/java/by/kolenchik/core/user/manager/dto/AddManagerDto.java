package by.kolenchik.core.user.manager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AddManagerDto {

    private String email;
    private String name;
    private String surname;
    private String patronymic;
    private String password;
    private LocalDate birthDate;
}
