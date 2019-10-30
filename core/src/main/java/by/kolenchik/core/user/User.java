package by.kolenchik.core.user;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@MappedSuperclass
@Data
public abstract class User  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false, length = 50)
    private String password;

    @Column(nullable = false, length = 25)
    private String name;

    @Column(nullable = false, length = 25)
    private String surname;

    @Column(length = 25)
    private String patronymic;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;
}
