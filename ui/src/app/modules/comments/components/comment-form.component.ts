import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Comment} from "../../../shared/models/comment"
import {CommentHttpService} from "../comment-http.service";
import {Task} from "../../../shared/models/task";
import {FieldLength} from "../../../shared/constants/field-length";
import {Hints} from "../../../shared/constants/hints";

@Component({
    selector: 'comment-form-component',
    template: `
        <mat-card>
            <form (ngSubmit)="save()">
                <mat-card-content>
                    <mat-form-field appearance="outline" class="comment-form-field">
                        <mat-label [textContent]="matLabelTextContent"></mat-label>
                        <textarea matInput
                                  class="task-form__description"
                                  placeholder="Input text"
                                  name="text"
                                  #text="ngModel"
                                  rows="3"
                                  [(ngModel)]="comment.text"
                                  [maxLength]="fieldLength.COMMENT_TEXT"
                        ></textarea>
                        <button mat-button *ngIf="comment.text"
                                matSuffix mat-icon-button
                                aria-label="Clear"
                                (click)="comment.text=''">
                            <mat-icon>close</mat-icon>
                        </button>
                        <mat-hint align="start" *ngIf="text.valid">
                            {{hints.MAX_LENGTH(fieldLength.COMMENT_TEXT)}}
                        </mat-hint>
                        <mat-hint align="end">
                            {{comment.text ? comment.text.length : 0}} / {{fieldLength.COMMENT_TEXT}}
                        </mat-hint>
                    </mat-form-field>
                </mat-card-content>
                <mat-card-actions>
                    <button mat-raised-button color="primary" type="submit">
                        Comment
                    </button>
                    <button mat-raised-button color="primary" type="button" *ngIf="replying" (click)="onCancelReply()">
                        Cancel Response
                    </button>
                </mat-card-actions>
            </form>
        </mat-card>
    `,
    styles: [`
        .comment-form-field {
            width: 100%;
        }
    `]
})
export class CommentFormComponent {
    private fieldLength = FieldLength;
    private hints = Hints;

    private matLabelTextContent: string = 'Comment';

    private replying: boolean = false;
    private comment: Comment = {} as Comment;
    private task: Task;
    private replyingComment: Comment;

    @Input() set taskInfo(task: Task) {
        this.task = task;
    }

    @Input() set onReplyComment(replyingComment: Comment) {
        if (replyingComment) {
            this.comment.commentId = replyingComment.id;
            this.replyingComment = replyingComment;
            this.matLabelTextContent = `Reply to ${replyingComment.authorName} ${replyingComment.authorSurname}`;
            this.replying = true;
        }
    }

    @Output() refreshCommentList: EventEmitter<boolean> = new EventEmitter();
    @Output() removeComment: EventEmitter<boolean> = new EventEmitter();

    constructor(private commentHttpService: CommentHttpService) {}

    save() {
        this.comment.taskId = this.task.id;
        this.comment.authorId = Number(localStorage.getItem("uid"));
        this.commentHttpService.save(this.comment)
            .subscribe(() => {
                this.refreshCommentList.emit(true);
                this.comment = {} as Comment;
                this.onCancelReply();
            });
    }

    onCancelReply() {
        this.matLabelTextContent = 'Comment';
        this.replying = false;
        this.comment.commentId = null;
        this.removeComment.emit(true);
    }
}
