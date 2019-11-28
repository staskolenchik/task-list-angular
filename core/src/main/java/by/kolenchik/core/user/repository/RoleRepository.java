package by.kolenchik.core.user.repository;

import by.kolenchik.core.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<UserRole, Long> {
    UserRole findByDesignation(String designation);
}
