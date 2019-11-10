package by.kolenchik.core.user.employee.service;

import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;

import java.util.List;

public interface EmployeeService {

    EmployeeInfoDto add(AddEmployeeDto addEmployeeDto);

    List<EmployeeInfoDto> findAll();

    void deleteById(Long id);
}
