package by.kolenchik.core.task.repository;

import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query(value = "SELECT task FROM Task task WHERE task.taskStatus IN :statuses")
    Page<Task> getByStatuses(Collection<TaskStatus> statuses, Pageable pageable);
}
