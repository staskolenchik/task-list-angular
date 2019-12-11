package by.kolenchik.core.comment.exceptions;

public class CommentNotFoundException extends RuntimeException {
    public CommentNotFoundException(String message, Object... args) {
        super(String.format(message, args));
    }
}
