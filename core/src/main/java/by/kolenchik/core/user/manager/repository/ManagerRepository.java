package by.kolenchik.core.user.manager.repository;

import by.kolenchik.core.user.manager.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
}
