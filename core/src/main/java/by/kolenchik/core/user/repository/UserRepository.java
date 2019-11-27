package by.kolenchik.core.user.repository;

import by.kolenchik.core.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findBySuperior(Long id);

    List<User> findAllBySuperiorIsNull();

    List<User> findAllBySuperiorNotNull();

}
