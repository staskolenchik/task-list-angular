package by.kolenchik.core.task.dto;

import by.kolenchik.core.task.TaskStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class TaskFilterDto {
    private Long createdBy;
    private Set<TaskStatus> statuses;
    private Set<Long> employeeIds;
    private String dateFrom;
    private String dateTo;
}
