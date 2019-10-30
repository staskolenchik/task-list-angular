package by.kolenchik.core.user.employee.repository;

import by.kolenchik.core.user.employee.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
