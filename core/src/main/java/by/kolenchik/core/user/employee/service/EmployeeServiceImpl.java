package by.kolenchik.core.user.employee.service;

import by.kolenchik.core.user.employee.Employee;
import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.dto.UpdateEmployeeDto;
import by.kolenchik.core.user.employee.repository.EmployeeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public EmployeeInfoDto add(AddEmployeeDto addEmployeeDto) {
        Employee employee = modelMapper.map(addEmployeeDto, Employee.class);

        Employee employeeFromDB = employeeRepository.save(employee);

        return modelMapper.map(employeeFromDB, EmployeeInfoDto.class);
    }

    @Override
    public List<EmployeeInfoDto> findAll() {
        List<Employee> employees = employeeRepository.findAll();

        return employees.stream()
                .map(employee -> modelMapper.map(employee, EmployeeInfoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeInfoDto update(Long id, UpdateEmployeeDto updateEmployeeDto) {
        Employee employeeFromDb = employeeRepository.getOne(id);
        BeanUtils.copyProperties(updateEmployeeDto, employeeFromDb);

        Employee savedEmployee = employeeRepository.save(employeeFromDb);

        return modelMapper.map(savedEmployee, EmployeeInfoDto.class);
    }

    @Override
    public void deleteById(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public EmployeeInfoDto findById(Long id) {
        Employee employee = employeeRepository.getOne(id);

        return modelMapper.map(employee, EmployeeInfoDto.class);
    }

    @Override
    public Boolean existsById(Long id) {
        return employeeRepository.existsById(id);
    }

    @Override
    public List<EmployeeInfoDto> findByManagerId(Long id) {
        List<Employee> employees = employeeRepository.findByManager_Id(id);
        List<EmployeeInfoDto> employeeInfoDtos = new ArrayList<>();

        for (Employee employee :
                employees) {
            EmployeeInfoDto employeeInfoDto = modelMapper.map(employee, EmployeeInfoDto.class);
            employeeInfoDtos.add(employeeInfoDto);
        }
        return employeeInfoDtos;
    }
}
