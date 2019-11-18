package by.kolenchik.core.task.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateTaskDto {

    private Long id;

    private String subject;

    private String description;

    private String status;

    private Long createdById;

    private Long assigneeId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime creationDateTime;
}
