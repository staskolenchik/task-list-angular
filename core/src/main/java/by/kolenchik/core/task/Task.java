package by.kolenchik.core.task;

import by.kolenchik.core.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance
@DiscriminatorColumn(name = "task_type")
@Data
@NoArgsConstructor
@Table(name = "task")
public abstract class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 45)
    private String subject;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "task_status", nullable = false)
    private TaskStatus taskStatus;

    @Column(name = "creation_timestamp", nullable = false)
    private LocalDateTime creationDateTime;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "assignee",nullable = false)
    private User assignee;
}
