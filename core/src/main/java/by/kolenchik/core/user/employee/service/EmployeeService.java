package by.kolenchik.core.user.employee.service;

import by.kolenchik.core.user.employee.Employee;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;

import java.util.List;

public interface EmployeeService {

    Employee add(Employee employee);

    List<EmployeeInfoDto> findAll();
}
