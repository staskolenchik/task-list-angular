package by.kolenchik.core.user.employee.service;

import by.kolenchik.core.user.employee.Employee;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.repository.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private ModelMapper modelMapper;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Employee add(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<EmployeeInfoDto> findAll() {
        List<Employee> employees = employeeRepository.findAll();

        return employees.stream()
                .map(employee -> modelMapper.map(employee, EmployeeInfoDto.class))
                .collect(Collectors.toList());
    }
}
