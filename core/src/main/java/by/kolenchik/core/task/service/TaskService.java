package by.kolenchik.core.task.service;

import by.kolenchik.core.task.Task;

import java.util.List;

public interface TaskService {

    Task add(Task task);

    List<Task> get();

    Task update(Long id, Task task);

    void delete(Task task);
}
