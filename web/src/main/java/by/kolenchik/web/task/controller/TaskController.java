package by.kolenchik.web.task.controller;

import by.kolenchik.core.task.dto.TaskAddDto;
import by.kolenchik.core.task.dto.TaskInfoDto;
import by.kolenchik.core.task.dto.UpdateTaskDto;
import by.kolenchik.core.task.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dev/tasks")
public class TaskController {

    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskInfoDto> findAll() {
        return taskService.findAll();
    }

    @PostMapping
    public TaskInfoDto add(@RequestBody TaskAddDto taskAddDto) {
        return taskService.add(taskAddDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        taskService.delete(id);
    }

    @PutMapping("/{id}")
    public TaskInfoDto update(
            @PathVariable("id") Long id,
            @RequestBody UpdateTaskDto updateTaskDto
    ) {
        return taskService.update(id, updateTaskDto);
    }
}
