package by.kolenchik.core.task.repository;

import by.kolenchik.core.task.IssueTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueTaskRepository extends JpaRepository<IssueTask, Long> {
}
