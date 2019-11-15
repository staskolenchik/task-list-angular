package by.kolenchik.core.task.service;

import by.kolenchik.core.task.IssueTask;
import by.kolenchik.core.task.StoryTask;
import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.TaskStatus;
import by.kolenchik.core.task.dto.TaskAddDto;
import by.kolenchik.core.task.dto.TaskItemDto;
import by.kolenchik.core.task.exceptions.TaskTypeUndefinedException;
import by.kolenchik.core.task.repository.TaskRepository;
import by.kolenchik.core.user.User;
import by.kolenchik.core.user.employee.Employee;
import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.exceptions.EmployeeNotFoundException;
import by.kolenchik.core.user.employee.service.EmployeeService;
import by.kolenchik.core.user.manager.Manager;
import by.kolenchik.core.user.manager.dto.AddManagerDto;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;
import by.kolenchik.core.user.manager.exceptions.ManagerNotFoundException;
import by.kolenchik.core.user.manager.service.ManagerService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private EmployeeService employeeService;
    private ManagerService managerService;
    private ModelMapper modelMapper;

    public TaskServiceImpl(
            TaskRepository taskRepository,
            EmployeeService employeeService,
            ManagerService managerService,
            ModelMapper modelMapper
    ) {
        this.taskRepository = taskRepository;
        this.employeeService = employeeService;
        this.managerService = managerService;
        this.modelMapper = modelMapper;
    }

    @Override
    public Task add(TaskAddDto taskAddDto) {
        validate(taskAddDto);

        Task task;

        if (taskAddDto.getType().equals("issue")) {
            task = modelMapper.map(taskAddDto, IssueTask.class);
        } else if (taskAddDto.getType().equals("story")) {
            task = modelMapper.map(taskAddDto, StoryTask.class);
        } else {
            throw new TaskTypeUndefinedException(
                    "Task has subject \"%s\", createdBy=%d, assignee=%d, but type is neither \"issue\" nor \"story\"",
                    taskAddDto.getSubject(),
                    taskAddDto.getCreatedById(),
                    taskAddDto.getAssigneeId()
            );
        }

        task.setTaskStatus(TaskStatus.TODO);
        task.setCreationDateTime(LocalDateTime.now());

        return taskRepository.save(task);
    }

    private void validate(TaskAddDto taskAddDto) {
        Long managerId = taskAddDto.getCreatedById();
        Long employeeId = taskAddDto.getAssigneeId();

        if (!managerService.existsById(taskAddDto.getCreatedById())) {
            throw new ManagerNotFoundException("Manager with id=%d was not found", managerId);
        }
        if (!employeeService.existsById(taskAddDto.getAssigneeId())) {
            throw new EmployeeNotFoundException("Employee with id=%d was not found", employeeId);
        }
    }

    @Override
    public List<TaskItemDto> findAll() {
        List<Task> tasks = taskRepository.findAll();
        List<TaskItemDto> taskItemDtos = new ArrayList<>();

        for (Task task :
                tasks) {
            TaskItemDto taskItemDto = modelMapper.map(task, TaskItemDto.class);

            if (task instanceof IssueTask) {
                taskItemDto.setType("issue");
            } else if (task instanceof StoryTask) {
                taskItemDto.setType("story");
            }

            taskItemDtos.add(taskItemDto);
        }

        return taskItemDtos;
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
