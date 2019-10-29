package by.kolenchik.core.task.service;

import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.dto.TaskAddDto;
import by.kolenchik.core.task.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task add(TaskAddDto taskAddDto) {
        Task task = new Task();
        return taskRepository.save(task);
    }

    @Override
    public List<Task> get() {
        return taskRepository.findAll();
    }

    @Override
    public Task update(Long id, Task task) {
        Task one = taskRepository.getOne(id);
        one.setSubject(task.getSubject());
        one.setDescription(task.getDescription());

        return taskRepository.save(one);
    }

    @Override
    public void delete(Task task) {
        taskRepository.delete(task);
    }
}
