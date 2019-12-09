package by.kolenchik.core.task.dto;

import by.kolenchik.core.task.TaskStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class TaskFilterDto {
    private Long createdBy;
    private Set<TaskStatus> statuses;
    private Set<Long> employeeIds;

    @JsonFormat(pattern="yyyy-MM-ddTHH:mm:ssZ")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime after;

    @JsonFormat(pattern="yyyy-MM-ddTHH:mm:ssZ")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime before;
}
