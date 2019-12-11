package by.kolenchik.core.comment.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class AddCommentDto {
    @NotBlank(message = "Text cannot be empty")
    @Length(max = 255, message = "Text cannot contain more than 255 characters")
    private String text;
    @NotNull(message = "Author id cannot be null")
    private Long authorId;
    @NotNull(message = "Task id cannot be null")
    private Long taskId;
    private Long commentId;
}
