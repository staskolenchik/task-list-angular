package by.kolenchik.web.task.controller;

import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.dto.TaskAddDto;
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
    public List<Task> get() {
        return taskService.get();
    }

    @PostMapping
    public Task add(@RequestBody TaskAddDto taskAddDto) {
        return taskService.add(taskAddDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Task task) {
        taskService.delete(task);
    }

    @PutMapping("/{id}")
    public Task update(
            @PathVariable("id") Long id,
            @RequestBody Task task
    ) {
        return taskService.update(id, task);
    }
}
