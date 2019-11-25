package by.kolenchik.core.task.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class TaskAddDto {

    @NotBlank(message = "Subject cannot be empty")
    @Length(max = 45, message = "Subject cannot contain more than 45 characters")
    private String subject;

    @Length(max = 255, message = "Description cannot contain more than 45 characters")
    private String description;

    @NotNull
    private Long createdById;

    @NotNull
    private Long assigneeId;

    @NotBlank(message = "Task type cannot be empty")
    private String type;
}
