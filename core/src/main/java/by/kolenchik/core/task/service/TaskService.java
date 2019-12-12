package by.kolenchik.core.task.service;

import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.dto.*;
import by.kolenchik.core.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {
    TaskInfoDto add(TaskAddDto taskAddDto);

    TaskInfoDto update(Long id, UpdateTaskDto updateTaskDto);

    void delete(Long id);

    Page<TaskInfoDto> find(TaskFilterDto taskFilterDto,Pageable pageable);

    void deleteAll(Long[] ids);

    boolean existsByTaskStatusAndAssignee(Long id, User assignee);

    Task getOneById(Long id);

    Page<TaskInfoDto> findAll(TaskEmployeeDto taskEmployeeDto, Pageable pageable);

    boolean existsById(Long commentId);
}
