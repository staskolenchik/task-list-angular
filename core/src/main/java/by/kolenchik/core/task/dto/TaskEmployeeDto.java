package by.kolenchik.core.task.dto;

import by.kolenchik.core.task.TaskStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class TaskEmployeeDto {
    private Long assigneeId;
    private Set<TaskStatus> statuses;
}
