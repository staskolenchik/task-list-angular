package by.kolenchik.core.task.service;

import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.dto.TaskAddDto;
import by.kolenchik.core.task.dto.TaskInfoDto;
import by.kolenchik.core.task.dto.UpdateTaskDto;

import java.util.List;

public interface TaskService {

    TaskInfoDto add(TaskAddDto taskAddDto);

    List<TaskInfoDto> findAll();

    TaskInfoDto update(Long id, UpdateTaskDto updateTaskDto);

    void delete(Task task);
}
