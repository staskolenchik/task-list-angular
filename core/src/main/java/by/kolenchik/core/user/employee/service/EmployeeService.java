package by.kolenchik.core.user.employee.service;

import by.kolenchik.core.task.service.TaskService;
import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.dto.UpdateEmployeeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EmployeeService {

    void setTaskService(TaskService taskService);

    EmployeeInfoDto add(AddEmployeeDto addEmployeeDto);

    Page<EmployeeInfoDto> findAll(Pageable pageable);

    EmployeeInfoDto update(Long id, UpdateEmployeeDto update);

    @Transactional
    void deleteById(Long id);

    EmployeeInfoDto findById(Long id);

    Boolean existsById(Long id);

    List<EmployeeInfoDto> findByManagerId(Long id);

    @Transactional
    void deleteAll(Long[] ids);
}
