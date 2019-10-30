package by.kolenchik.core.task.service;

import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.dto.TaskAddDto;

import java.util.List;

public interface TaskService {

    Task add(TaskAddDto taskAddDto);

    List<Task> get();

    Task update(Long id, Task task);

    void delete(Task task);
}
