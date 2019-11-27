package by.kolenchik.core.user.employee.service;

import by.kolenchik.core.user.User;
import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.dto.UpdateEmployeeDto;
import by.kolenchik.core.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private UserRepository userRepository;
    private ModelMapper modelMapper;

    public EmployeeServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public EmployeeInfoDto add(AddEmployeeDto addEmployeeDto) {
        User employee = modelMapper.map(addEmployeeDto, User.class);

        User employeeFromDB = userRepository.save(employee);

        return modelMapper.map(employeeFromDB, EmployeeInfoDto.class);
    }

    @Override
    public List<EmployeeInfoDto> findAll() {
        List<User> employees = userRepository.findAllBySuperiorNotNull();

        return employees.stream()
                .map(employee -> modelMapper.map(employee, EmployeeInfoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeInfoDto update(Long id, UpdateEmployeeDto updateEmployeeDto) {
        User employeeFromDb = userRepository.getOne(id);
        BeanUtils.copyProperties(updateEmployeeDto, employeeFromDb);

        User savedEmployee = userRepository.save(employeeFromDb);

        return modelMapper.map(savedEmployee, EmployeeInfoDto.class);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public EmployeeInfoDto findById(Long id) {
        User employee = userRepository.getOne(id);

        return modelMapper.map(employee, EmployeeInfoDto.class);
    }

    @Override
    public Boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    public List<EmployeeInfoDto> findByManagerId(Long id) {
        List<User> employees = userRepository.findBySuperior(id);
        List<EmployeeInfoDto> employeeInfoDtos = new ArrayList<>();

        for (User employee :
                employees) {
            EmployeeInfoDto employeeInfoDto = modelMapper.map(employee, EmployeeInfoDto.class);
            employeeInfoDtos.add(employeeInfoDto);
        }
        return employeeInfoDtos;
    }
}
