package by.kolenchik.core.comment.service;

import by.kolenchik.core.comment.dto.AddCommentDto;
import by.kolenchik.core.comment.dto.CommentInfoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface CommentService {
    Page<CommentInfoDto> findAllByTaskId(Long id, Pageable pageable);

    @Transactional
    CommentInfoDto add(AddCommentDto addCommentDto);
}
