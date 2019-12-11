import {Component, Input} from "@angular/core";
import {Task} from "../../shared/models/task";
import {Comment} from "../../shared/models/comment"

@Component({
    selector: 'comment-component',
    template: `
        <div>
            <comment-form-component [taskInfo]="task"
                                    [onReplyComment]="replyingComment"
                                    (refreshCommentList)="updateCommentList($event)" (removeComment)="removeComment($event)"
            ></comment-form-component>
            <br>
            <comment-list-component [taskInfo]="task"
                                    [refreshing]="refreshing"
                                    (afterRefreshed)="onRefresh($event)"
                                    (replyComment)="onReplyComment($event)"
            ></comment-list-component>
        </div>
    `,
    styles: [`
        mat-form-field {
            width: 100%;
        }
    `]
})
export class CommentComponent {
    @Input() private task: Task;
    private refreshing: boolean = false;
    private replyingComment: Comment;

    updateCommentList(updating: boolean) {
        this.refreshing = updating;
    }

    onRefresh(refreshed: boolean) {
        this.refreshing = refreshed;
    }

    onReplyComment(comment: Comment) {
        this.replyingComment = comment;
    }

    removeComment(value: boolean) {
        this.replyingComment = null;
    }
}
