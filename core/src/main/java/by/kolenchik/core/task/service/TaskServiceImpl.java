package by.kolenchik.core.task.service;

import by.kolenchik.core.task.IssueTask;
import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.TaskStatus;
import by.kolenchik.core.task.dto.TaskAddDto;
import by.kolenchik.core.task.repository.TaskRepository;
import by.kolenchik.core.user.User;
import by.kolenchik.core.user.employee.Employee;
import by.kolenchik.core.user.employee.service.EmployeeService;
import by.kolenchik.core.user.manager.Manager;
import by.kolenchik.core.user.manager.service.ManagerService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private EmployeeService employeeService;
    private ManagerService managerService;
    private ModelMapper modelMapper;

    public TaskServiceImpl(TaskRepository taskRepository, EmployeeService employeeService,
                           ManagerService managerService, ModelMapper modelMapper) {
        this.taskRepository = taskRepository;
        this.employeeService = employeeService;
        this.managerService = managerService;
        this.modelMapper = modelMapper;
    }

    @Override
    public Task add(TaskAddDto taskAddDto) {

        Manager manager = createManager();
        Employee employee = createEmployeeUnderManager(manager);


        Task task = setupAndGetIssueTask(taskAddDto, manager, employee);

        return taskRepository.save(task);
    }

    private Task setupAndGetIssueTask(TaskAddDto taskAddDto, Manager manager, Employee employee) {
        System.out.println(taskAddDto);
        Task task = modelMapper.map(taskAddDto, IssueTask.class);


        task.setCreationDateTime(LocalDateTime.now());
        task.setCreatedBy(manager);
        task.setAssignee(employee);
        task.setTaskStatus(TaskStatus.TODO);

        System.out.println(task);

        return task;
    }

    private Manager createManager() {
        Manager manager = new Manager();
        setupUserInfo(manager);
        return managerService.add(manager);
    }

    private Employee createEmployeeUnderManager(Manager manager) {
        Employee employee = new Employee();
        setupUserInfo(employee);
        employee.setManager(manager);
        return employeeService.add(employee);
    }

    private void setupUserInfo(User user) {
        user.setName("Vasia");
        user.setSurname("Beliy");
        user.setBirthDate(LocalDate.now());
        long index = Math.round(Math.random() * Math.random() * 100000);
        user.setEmail("test" + index +"@gmail.com");
        user.setPassword("12345678");
    }

    @Override
    public List<Task> get() {
        return taskRepository.findAll();
    }

    @Override
    public Task update(Long id, Task task) {
        Task one = taskRepository.getOne(id);
        one.setSubject(task.getSubject());
        one.setDescription(task.getDescription());

        return taskRepository.save(one);
    }

    @Override
    public void delete(Task task) {
        taskRepository.delete(task);
    }
}
