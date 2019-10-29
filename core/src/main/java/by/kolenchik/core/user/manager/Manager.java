package by.kolenchik.core.user.manager;

import by.kolenchik.core.user.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Table(name = "manager")
@Data
@EqualsAndHashCode(callSuper = true)
public class Manager extends User {


}

