package by.kolenchik.core.task.service;

import by.kolenchik.core.task.dto.TaskAddDto;
import by.kolenchik.core.task.dto.TaskFilterDto;
import by.kolenchik.core.task.dto.TaskInfoDto;
import by.kolenchik.core.task.dto.UpdateTaskDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {

    TaskInfoDto add(TaskAddDto taskAddDto);

    TaskInfoDto update(Long id, UpdateTaskDto updateTaskDto);

    void delete(Long id);

    Page<TaskInfoDto> find(TaskFilterDto taskFilterDto,Pageable pageable);

    void deleteAll(Long[] ids);
}
