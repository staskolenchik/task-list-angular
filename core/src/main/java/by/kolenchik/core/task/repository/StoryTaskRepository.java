package by.kolenchik.core.task.repository;

import by.kolenchik.core.task.StoryTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryTaskRepository extends JpaRepository<StoryTask, Long> {
}
