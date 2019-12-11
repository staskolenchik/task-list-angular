package by.kolenchik.core.comment.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentInfoDto {
    private Long id;
    private String text;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime creationTimestamp;
    private String authorName;
    private String authorSurname;
    private Long commentId;
    private String commentAuthorName;
    private String commentAuthorSurname;
}
