package by.kolenchik.core.task;

import by.kolenchik.core.comment.Comment;
import by.kolenchik.core.user.employee.Employee;
import by.kolenchik.core.user.manager.Manager;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Inheritance
@DiscriminatorColumn(name = "task_type")
@Data
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
    private Manager createdBy;

    @ManyToOne
    @JoinColumn(name = "assignee",nullable = false)
    private Employee assignee;

    @OneToMany(mappedBy = "task", orphanRemoval = true)
    private Set<Comment> comment;
}
