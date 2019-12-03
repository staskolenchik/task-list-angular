package by.kolenchik.core.user.repository;

import by.kolenchik.core.user.User;
import by.kolenchik.core.user.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findBySuperior(Long id);

    List<User> findAllByRoles(Set<UserRole> roles);

    Page<User> findAllByRoles(Set<UserRole> roles, Pageable pageable);

    List<User> findAllBySuperiorIsNull();

    List<User> findAllBySuperiorNotNull();

    User findByEmail(String email);

    boolean existsByEmail(String email);
}
