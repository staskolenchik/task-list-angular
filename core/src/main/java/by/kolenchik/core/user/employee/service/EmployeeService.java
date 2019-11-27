package by.kolenchik.core.user.employee.service;

import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.dto.UpdateEmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeInfoDto add(AddEmployeeDto addEmployeeDto);

    List<EmployeeInfoDto> findAll();

    EmployeeInfoDto update(Long id, UpdateEmployeeDto update);

    void deleteById(Long id);

    EmployeeInfoDto findById(Long id);

    Boolean existsById(Long id);

    List<EmployeeInfoDto> findByManagerId(Long id);
}
