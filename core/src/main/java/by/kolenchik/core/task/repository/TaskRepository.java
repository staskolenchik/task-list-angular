package by.kolenchik.core.task.repository;

import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.TaskStatus;
import by.kolenchik.core.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query(value = "SELECT task FROM Task task WHERE task.taskStatus IN :statuses")
    Page<Task> getByStatuses(Collection<TaskStatus> statuses, Pageable pageable);

    @Query(value = "SELECT task FROM Task task WHERE task.taskStatus IN :statuses AND task.assignee = :assignee")
    List<Task> findAllByTaskStatusAndAssignee(Set<TaskStatus> statuses, @Param("assignee") User assignee);
}
