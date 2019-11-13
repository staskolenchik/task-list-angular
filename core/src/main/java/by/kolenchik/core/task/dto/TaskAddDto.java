package by.kolenchik.core.task.dto;

import lombok.Data;

@Data
public class TaskAddDto {

    private String subject;

    private String description;

    private Long createdById;

    private Long assigneeId;

    private String type;
}
