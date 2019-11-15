package by.kolenchik.core.task.service;

import by.kolenchik.core.task.IssueTask;
import by.kolenchik.core.task.StoryTask;
import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.TaskStatus;
import by.kolenchik.core.task.dto.TaskAddDto;
import by.kolenchik.core.task.dto.TaskInfoDto;
import by.kolenchik.core.task.dto.UpdateTaskDto;
import by.kolenchik.core.task.exceptions.TaskTypeUndefinedException;
import by.kolenchik.core.task.repository.TaskRepository;
import by.kolenchik.core.user.employee.exceptions.EmployeeNotFoundException;
import by.kolenchik.core.user.employee.service.EmployeeService;
import by.kolenchik.core.user.manager.exceptions.ManagerNotFoundException;
import by.kolenchik.core.user.manager.service.ManagerService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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

        return taskRepository.save(task);
    }

    private void validateAdd(TaskAddDto taskAddDto) {
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
    public List<TaskInfoDto> findAll() {
        List<Task> tasks = taskRepository.findAll();
        List<TaskInfoDto> taskInfoDtos = new ArrayList<>();

        for (Task task :
                tasks) {
            TaskInfoDto taskInfoDto = modelMapper.map(task, TaskInfoDto.class);

            if (task instanceof IssueTask) {
                taskInfoDto.setType("issue");
            } else if (task instanceof StoryTask) {
                taskInfoDto.setType("story");
            }

            taskInfoDtos.add(taskInfoDto);
        }

        return taskInfoDtos;
    }

    @Override
    public TaskInfoDto update(Long id, UpdateTaskDto updateTaskDto) {
        validateUpdate(updateTaskDto);

        Task one = taskRepository.getOne(id);

        modelMapper.map(updateTaskDto, one);

        Task taskFromDb = taskRepository.save(one);

        return modelMapper.map(taskFromDb, TaskInfoDto.class);
    }

    private void validateUpdate(UpdateTaskDto updateTaskDto) {
        Long managerId = updateTaskDto.getCreatedById();
        Long employeeId = updateTaskDto.getAssigneeId();

        if (!managerService.existsById(managerId)) {
            throw new ManagerNotFoundException("Manager with id=%d was not found", managerId);
        }
        if (!employeeService.existsById(employeeId)) {
            throw new EmployeeNotFoundException("Employee with id=%d was not found", employeeId);
        }
    }

    @Override
    public void delete(Task task) {
        taskRepository.delete(task);
    }
}
