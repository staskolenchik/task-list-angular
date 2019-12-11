export interface Comment {
    id: number;
    text: string;
    creationTimestamp: string;
    authorId: number,
    authorName: string;
    authorSurname: string;
    commentId: number;
    commentAuthorName: string;
    commentAuthorSurname: string;
    taskId: number;
}
