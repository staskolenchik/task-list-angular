package by.kolenchik.web.task.controller;

import by.kolenchik.core.task.dto.*;
import by.kolenchik.core.task.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/dev/tasks")
public class TaskController {

    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public TaskInfoDto add(@Valid @RequestBody TaskAddDto taskAddDto) {
        return taskService.add(taskAddDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        taskService.delete(id);
    }

    @DeleteMapping
    public void deleteAll(Long... ids) {
        taskService.deleteAll(ids);
    }

    @PutMapping("/{id}")
    public TaskInfoDto update(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateTaskDto updateTaskDto
    ) {
        return taskService.update(id, updateTaskDto);
    }

    @GetMapping
    public Page<TaskInfoDto> find(
            TaskFilterDto taskFilterDto,
            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return taskService.find(taskFilterDto, pageable);
    }

    @GetMapping("/employee")
    public Page<TaskInfoDto> findAll(
            TaskEmployeeDto taskEmployeeDto,
            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return taskService.findAll(taskEmployeeDto, pageable);
    }
}
