package by.kolenchik.core.comment.service;

import by.kolenchik.core.comment.Comment;
import by.kolenchik.core.comment.CommentReview;
import by.kolenchik.core.comment.TaskReview;
import by.kolenchik.core.comment.dto.AddCommentDto;
import by.kolenchik.core.comment.dto.CommentInfoDto;
import by.kolenchik.core.comment.exceptions.CommentNotFoundException;
import by.kolenchik.core.comment.repository.CommentRepository;
import by.kolenchik.core.task.Task;
import by.kolenchik.core.task.exceptions.TaskNotFoundException;
import by.kolenchik.core.task.service.TaskService;
import by.kolenchik.core.user.User;
import by.kolenchik.core.user.employee.service.EmployeeService;
import by.kolenchik.core.user.exception.UserNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentServiceImpl implements CommentService {
    private CommentRepository commentRepository;
    private ModelMapper modelMapper;
    private TaskService taskService;
    private EmployeeService employeeService;

    @Autowired
    public CommentServiceImpl(
            CommentRepository commentRepository,
            ModelMapper modelMapper,
            TaskService taskService,
            EmployeeService employeeService
    ) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
        this.taskService = taskService;
        this.employeeService = employeeService;
    }

    @Override
    public Page<CommentInfoDto> findAllByTaskId(Long id, Pageable pageable) {
        Page<Comment> page = commentRepository.findAllByTask_Id(id, pageable);

        return page.map(comment -> {
            CommentInfoDto commentInfoDto = modelMapper.map(comment, CommentInfoDto.class);

            if (comment instanceof CommentReview) {
                CommentReview commentReview = (CommentReview) comment;
                Comment replyComment = commentRepository.getOne(commentReview.getCommentId());
                commentInfoDto.setCommentAuthorName(replyComment.getAuthor().getName());
                commentInfoDto.setCommentAuthorSurname(replyComment.getAuthor().getSurname());
            }

            return commentInfoDto;
        });
    }

    @Override
    public CommentInfoDto add(AddCommentDto addCommentDto) {
        validateAdd(addCommentDto);

        Task task = taskService.getOneById(addCommentDto.getTaskId());
        User user = employeeService.getOne(addCommentDto.getAuthorId());

        Comment comment;

        if (addCommentDto.getCommentId() != null) {
            comment = new CommentReview(addCommentDto.getCommentId());
        } else {
            comment = new TaskReview();
        }

        comment.setTask(task);
        comment.setAuthor(user);
        comment.setCreationTimestamp(LocalDateTime.now());
        comment.setText(addCommentDto.getText());

        Comment savedComment = commentRepository.save(comment);
        return modelMapper.map(savedComment, CommentInfoDto.class);
    }

    private void validateAdd(AddCommentDto addCommentDto) {
        if (!employeeService.existsByIdAndDeleteDateIsNull(addCommentDto.getAuthorId())) {
            throw new UserNotFoundException("User with id=%d wasn't found", addCommentDto.getAuthorId());
        }

        if (!taskService.existsById(addCommentDto.getTaskId())) {
            throw new TaskNotFoundException("Task with id=%d wasn't found", addCommentDto.getTaskId());
        }

        if (addCommentDto.getCommentId() != null) {
            if (!commentRepository.existsById(addCommentDto.getCommentId())) {
                throw new CommentNotFoundException("Comment with id=%d wasn't found", addCommentDto.getCommentId());
            }
        }
    }
}
