package by.kolenchik.core.user.employee.service;

import by.kolenchik.core.user.UserRole;
import by.kolenchik.core.user.User;
import by.kolenchik.core.user.UserRoleEnum;
import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.dto.UpdateEmployeeDto;
import by.kolenchik.core.user.repository.UserRoleRepository;
import by.kolenchik.core.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private UserRepository userRepository;
    private ModelMapper modelMapper;
    private UserRoleRepository userRoleRepository;

    public EmployeeServiceImpl(
            UserRepository userRepository,
            ModelMapper modelMapper,
            UserRoleRepository userRoleRepository
    ) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.userRoleRepository = userRoleRepository;
    }

    @Override
    public EmployeeInfoDto add(AddEmployeeDto addEmployeeDto) {
        User employee = modelMapper.map(addEmployeeDto, User.class);

        UserRole employeeUserRole = userRoleRepository.findByDesignation(UserRoleEnum.EMPLOYEE.name());
        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(employeeUserRole);
        employee.setRoles(userRoles);

        User employeeFromDB = userRepository.save(employee);

        return modelMapper.map(employeeFromDB, EmployeeInfoDto.class);
    }

    @Override
    public Page<EmployeeInfoDto> findAll(Pageable pageable) {
        UserRole employeeRole = userRoleRepository.findByDesignation(UserRoleEnum.EMPLOYEE.name());
        Set<UserRole> roles = new HashSet<>();
        roles.add(employeeRole);

        Page<User> employees = userRepository.findAllByRolesAndDeleteDateIsNull(roles, pageable);

        return employees.map(employee -> modelMapper.map(employee, EmployeeInfoDto.class));
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
        userRepository.delete(id);
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

    @Override
    public void deleteAll(Long[] ids) {
        for (Long id : ids) {
            userRepository.delete(id);
        }
    }
}
