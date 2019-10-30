package by.kolenchik.core.user.employee;

import by.kolenchik.core.user.User;
import by.kolenchik.core.user.manager.Manager;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "employee")
@Data
@EqualsAndHashCode(callSuper = true)
public class Employee extends User {

    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false)
    private Manager manager;
}
