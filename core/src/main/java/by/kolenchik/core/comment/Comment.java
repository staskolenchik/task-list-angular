package by.kolenchik.core.comment;

import by.kolenchik.core.task.Task;
import by.kolenchik.core.user.User;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "comment")
@Data
public abstract class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    @Column(name = "creation_timestamp",nullable = false)
    private LocalDateTime creationDate;

    @ManyToOne
    @JoinColumn(name = "author_id",nullable = false)
    private User author;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;
}
