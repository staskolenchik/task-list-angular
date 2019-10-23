package by.kolenchik.core.task.repository;

import by.kolenchik.core.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
