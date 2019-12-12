package by.kolenchik.core.user;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "usr")
@Getter
@Setter
public class User  {

    public User() {
    }

    public <T extends User> User(T user) {
        id = user.getId();
        email = user.getEmail();
        password = user.getPassword();
        name = user.getName();
        surname = user.getSurname();
        patronymic = user.getPatronymic();
        birthDate = user.getBirthDate();
        superior = user.getSuperior();
        deleteDate = user.getDeleteDate();
        roles = user.getRoles();
    }

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

    @Column(name = "superior_id")
    private Long superior;

    @Column(name = "delete_date")
    private LocalDate deleteDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "usr_role",
            joinColumns = {@JoinColumn(name = "usr_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "id")}
    )
    private Set<UserRole> roles;
}
