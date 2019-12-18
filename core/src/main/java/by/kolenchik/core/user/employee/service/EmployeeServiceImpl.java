package by.kolenchik.core.user.employee.service;

import by.kolenchik.core.task.service.TaskService;
import by.kolenchik.core.user.User;
import by.kolenchik.core.user.UserRole;
import by.kolenchik.core.user.UserRoleEnum;
import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.dto.UpdateEmployeeDto;
import by.kolenchik.core.user.exception.DuplicateEmailException;
import by.kolenchik.core.user.exception.IncompleteTaskException;
import by.kolenchik.core.user.exception.UserNotFoundException;
import by.kolenchik.core.user.repository.UserRepository;
import by.kolenchik.core.user.repository.UserRoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private UserRepository userRepository;
    private ModelMapper modelMapper;
    private UserRoleRepository userRoleRepository;
    private TaskService taskService;

    @Autowired
    public EmployeeServiceImpl(
            UserRepository userRepository,
            ModelMapper modelMapper,
            UserRoleRepository userRoleRepository
    ) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.userRoleRepository = userRoleRepository;
    }

    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @Override
    public EmployeeInfoDto add(AddEmployeeDto addEmployeeDto) {
        validateAdd(addEmployeeDto);

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
    public List<EmployeeInfoDto> findByManagerId(Long id) {
        List<User> employees = userRepository.findBySuperior(id);

        return employees.stream()
                .map(employee -> modelMapper.map(employee, EmployeeInfoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<User> findAllByIds(Set<Long> ids) {
        for (Long id : ids) {
            validateGet(id);
        }

        return userRepository.findByIdInAndDeleteDateNotNull(ids);
    }

    @Override
    public EmployeeInfoDto update(Long id, UpdateEmployeeDto updateEmployeeDto) {
        validateUpdate(id, updateEmployeeDto);

        User employeeFromDb = userRepository.findByIdAndDeleteDateIsNull(id);
        BeanUtils.copyProperties(updateEmployeeDto, employeeFromDb);

        User savedEmployee = userRepository.save(employeeFromDb);

        return modelMapper.map(savedEmployee, EmployeeInfoDto.class);
    }

    @Override
    public EmployeeInfoDto findById(Long id) {
        validateGet(id);

        User employee = userRepository.findByIdAndDeleteDateIsNull(id);

        return modelMapper.map(employee, EmployeeInfoDto.class);
    }

    @Override
    public void deleteById(Long id) {
        validateDelete(id);

        userRepository.delete(id);
    }

    @Override
    public void deleteAll(Long[] ids) {
        for (Long id : ids) {
            validateDelete(id);

            userRepository.delete(id);
        }
    }

    @Override
    public Boolean existsByIdAndDeleteDateIsNull(Long id) {
        return userRepository.existsByIdAndDeleteDateIsNull(id);
    }

    @Override
    public User getOne(Long id) {
        validateGet(id);

        return userRepository.getOne(id);
    }

    private void validateAdd(AddEmployeeDto addEmployeeDto) {
        if (userRepository.existsByEmail(addEmployeeDto.getEmail())) {
            throw new DuplicateEmailException("Email=%s already exists", addEmployeeDto.getEmail());
        }

        Set<UserRole> roles = new HashSet<>();
        UserRole userRole = userRoleRepository.findByDesignation(UserRoleEnum.MANAGER.name());
        roles.add(userRole);
        if (!userRepository.existsByIdAndRolesAndDeleteDateIsNull(addEmployeeDto.getSuperior(), roles)) {
            throw new UserNotFoundException("Manager with id=%d wasn't found", addEmployeeDto.getSuperior());
        }
    }

    private void validateGet(Long id) {
        if (!userRepository.existsByIdAndDeleteDateIsNull(id)) {
            throw new UserNotFoundException("User with id=%d was not found", id);
        }
    }

    private void validateUpdate(Long id, UpdateEmployeeDto updateEmployeeDto) {
        if (!userRepository.existsByIdAndDeleteDateIsNull(id)) {
            throw new UserNotFoundException("Employee with id=%d wasn't found", id);
        }

        Set<UserRole> roles = new HashSet<>();
        UserRole userRole = userRoleRepository.findByDesignation(UserRoleEnum.MANAGER.name());
        roles.add(userRole);

        if (!userRepository.existsByIdAndRolesAndDeleteDateIsNull(updateEmployeeDto.getSuperior(), roles)) {
            throw new UserNotFoundException("Manager with id=%d wasn't found", updateEmployeeDto.getSuperior());
        }
    }

    private void validateDelete(Long id) {
        User employee = userRepository.findByIdAndDeleteDateIsNull(id);
        if (taskService.existsByTaskStatusAndAssignee(id, employee)) {
            throw new IncompleteTaskException("Employee with id=%d has incomplete tasks", id);
        }
    }
}
