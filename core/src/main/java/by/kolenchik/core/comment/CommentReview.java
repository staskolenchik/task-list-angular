package by.kolenchik.core.comment;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class CommentReview extends Comment {

    @Column(name = "comment_id", nullable = false, updatable = false)
    private Long commentId;
}
