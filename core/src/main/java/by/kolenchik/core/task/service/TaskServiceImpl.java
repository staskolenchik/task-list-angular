package by.kolenchik.core.task.service;

import by.kolenchik.core.email.EmailMessage;
import by.kolenchik.core.email.service.EmailService;
import by.kolenchik.core.task.IssueTask;
import by.kolenchik.core.task.StoryTask;
import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.TaskStatus;
import by.kolenchik.core.task.dto.*;
import by.kolenchik.core.task.exceptions.TaskNotFoundException;
import by.kolenchik.core.task.exceptions.TaskTypeUndefinedException;
import by.kolenchik.core.task.repository.TaskRepository;
import by.kolenchik.core.user.User;
import by.kolenchik.core.user.employee.service.EmployeeService;
import by.kolenchik.core.user.exception.UserNotFoundException;
import by.kolenchik.core.user.manager.service.ManagerService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private EmployeeService employeeService;
    private ManagerService managerService;
    private ModelMapper modelMapper;
    private EmailService emailService;

    public TaskServiceImpl(
            TaskRepository taskRepository,
            EmployeeService employeeService,
            ManagerService managerService,
            ModelMapper modelMapper,
            EmailService emailService
    ) {
        this.taskRepository = taskRepository;
        this.employeeService = employeeService;
        this.managerService = managerService;
        this.modelMapper = modelMapper;
        this.emailService = emailService;
    }

    @PostConstruct
    public void init() {
        employeeService.setTaskService(this);
    }

    @Override
    public TaskInfoDto add(TaskAddDto taskAddDto) {
        validateAdd(taskAddDto);

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
        task.setId(null);
        Task taskFromDB = taskRepository.save(task);

        User assignee = employeeService.getOne(taskFromDB.getAssignee().getId());
        taskFromDB.setAssignee(assignee);

        User createdBy = managerService.findUserById(taskFromDB.getCreatedBy().getId());
        taskFromDB.setCreatedBy(createdBy);

        emailAboutNewTask(taskFromDB);

        TaskInfoDto taskInfoDto = modelMapper.map(taskFromDB, TaskInfoDto.class);

        if (taskFromDB instanceof IssueTask) {
            taskInfoDto.setType("issue");
        } else if (taskFromDB instanceof StoryTask) {
            taskInfoDto.setType("story");
        }

        return taskInfoDto;
    }

    private void emailAboutNewTask(Task task) {
        String text = String.format(
                "Subject: %s.\nDesctiption: %s.\nCreated by: %s %s",
                task.getSubject(),
                task.getDescription(),
                task.getCreatedBy().getName(),
                task.getCreatedBy().getSurname()
        );

        EmailMessage message = new EmailMessage();
        message.setRecipient(task.getAssignee().getEmail());
        message.setSubject("You got a new task!");
        message.setText(text);

        emailService.sendEmail(message);
    }

    private void validateAdd(TaskAddDto taskAddDto) {
        Long managerId = taskAddDto.getCreatedById();
        Long employeeId = taskAddDto.getAssigneeId();

        if (!managerService.existsById(managerId)) {
            throw new UserNotFoundException("Manager with id=%d was not found", managerId);
        }
        if (!employeeService.existsByIdAndDeleteDateIsNull(employeeId)) {
            throw new UserNotFoundException("Employee with id=%d was not found", employeeId);
        }
    }

    @Override
    public TaskInfoDto update(Long id, UpdateTaskDto updateTaskDto) {
        validateUpdate(updateTaskDto);

        Task taskFromDb = taskRepository.getOne(id);
        TaskStatus before = taskFromDb.getTaskStatus();

        modelMapper.map(updateTaskDto, taskFromDb);
        Task updatedTask = taskRepository.save(taskFromDb);
        
        if (comingToDone(before, updatedTask.getTaskStatus())) {
            User assignee = employeeService.getOne(updatedTask.getAssignee().getId());
            updatedTask.setAssignee(assignee);

            User createdBy = managerService.findUserById(updatedTask.getCreatedBy().getId());
            updatedTask.setCreatedBy(createdBy);

            emailAboutTaskChangeStatus(taskFromDb);
        }
        
        TaskInfoDto taskInfoDto = modelMapper.map(updatedTask, TaskInfoDto.class);

        if (updatedTask instanceof IssueTask) {
            taskInfoDto.setType("issue");
        } else if (updatedTask instanceof StoryTask) {
            taskInfoDto.setType("story");
        }
        
        return taskInfoDto;
    }

    private boolean comingToDone(TaskStatus before, TaskStatus after) {
        return before.ordinal() < after.ordinal();
    }

    private void emailAboutTaskChangeStatus(Task task) {
        EmailMessage message = new EmailMessage();
        message.setRecipient(task.getCreatedBy().getEmail());
        message.setSubject(String.format(
                "Task status changed to %s by %s %s",
                task.getTaskStatus().name(),
                task.getAssignee().getName(),
                task.getAssignee().getSurname()
        ));
        message.setText(String.format(
                "Subject: %s.\nDesctiption: %s.\nRegistered at: %s",
                task.getSubject(),
                task.getDescription(),
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))
        ));

        emailService.sendEmail(message);
    }

    private void validateUpdate(UpdateTaskDto updateTaskDto) {
        Long managerId = updateTaskDto.getCreatedById();
        Long employeeId = updateTaskDto.getAssigneeId();

        if (!managerService.existsById(managerId)) {
            throw new UserNotFoundException("Manager with id=%d was not found", managerId);
        }
        if (!employeeService.existsByIdAndDeleteDateIsNull(employeeId)) {
            throw new UserNotFoundException("Employee with id=%d was not found", employeeId);
        }
    }

    @Override
    public void delete(Long id) {
        validateById(id);
        taskRepository.deleteById(id);
    }

    private void validateById(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException("Task with id=%d doesn't exist", id);
        }
    }

    @Override
    public Page<TaskInfoDto> find(TaskFilterDto taskFilterDto, Pageable pageable) {
        User createdBy = null;
        if (taskFilterDto.getCreatedBy() != null) {
            createdBy = managerService.findUserById(taskFilterDto.getCreatedBy());
        }

        List<User> assignees = null;
        if (taskFilterDto.getEmployeeIds() != null) {
            assignees = employeeService.findAllByIds(taskFilterDto.getEmployeeIds());
        }

        Page<Task> page = taskRepository.getByStatusesAndByEmployeeId(
                createdBy,
                taskFilterDto.getStatuses(),
                assignees,
                taskFilterDto.getAfter(),
                taskFilterDto.getBefore(),
                pageable
        );

        return page.map(task -> {
            TaskInfoDto taskInfoDto = modelMapper.map(task, TaskInfoDto.class);

            if (task instanceof IssueTask) {
                taskInfoDto.setType("issue");
            } else if (task instanceof StoryTask) {
                taskInfoDto.setType("story");
            }

            return taskInfoDto;
        });
    }

    @Override
    public void deleteAll(Long[] ids) {
        for (Long id : ids) {
            validateById(id);

            taskRepository.deleteById(id);
        }
    }

    public boolean existsByTaskStatusAndAssignee(Long id, User assignee) {
        Set<TaskStatus> taskStatuses = new HashSet<>();
        taskStatuses.add(TaskStatus.TODO);
        taskStatuses.add(TaskStatus.IN_PROGRESS);
        taskStatuses.add(TaskStatus.IN_REVIEW);

        List<Task> allByTaskStatusAndAssignee = taskRepository.findAllByTaskStatusAndAssignee(taskStatuses, assignee);
        return !allByTaskStatusAndAssignee.isEmpty();
    }

    @Override
    public Task getOneById(Long id) {
        return taskRepository.getOne(id);
    }

    @Override
    public Page<TaskInfoDto> findAll(TaskEmployeeDto taskEmployeeDto, Pageable pageable) {
        User user = employeeService.getOne(taskEmployeeDto.getAssigneeId());

        Page<Task> tasks = taskRepository.findAllByTaskStatusAndAssignee(
                taskEmployeeDto.getStatuses(),
                user,
                pageable
        );
        return tasks.map(task -> modelMapper.map(task, TaskInfoDto.class));
    }

    @Override
    public boolean existsById(Long id) {
        return taskRepository.existsById(id);
    }
}
