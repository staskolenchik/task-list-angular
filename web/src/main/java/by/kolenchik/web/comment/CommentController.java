package by.kolenchik.web.comment;

import by.kolenchik.core.comment.dto.AddCommentDto;
import by.kolenchik.core.comment.dto.CommentInfoDto;
import by.kolenchik.core.comment.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/dev/comments")
public class CommentController {
    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/tasks/{id}")
    public Page<CommentInfoDto> findAllByTaskId(
            @PathVariable Long id,
            @PageableDefault(
                    size = 5,
                    sort = ("creationTimestamp"),
                    direction = Sort.Direction.DESC
            ) Pageable pageable
    ) {
        return commentService.findAllByTaskId(id, pageable);
    }

    @PostMapping
    public CommentInfoDto add(@Valid @RequestBody AddCommentDto addCommentDto) {
        return this.commentService.add(addCommentDto);
    }
}
