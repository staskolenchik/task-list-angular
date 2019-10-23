package by.kolenchik.core.task;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "task_id_seq")
    @SequenceGenerator(name = "task_id_seq", sequenceName = "task_id_seq")
    @Column(unique = true, nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, length = 45)
    private String subject;

    private String description;
}
