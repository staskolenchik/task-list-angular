import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Comment} from "../../../shared/models/comment"
import {Page} from "../../../shared/models/page";
import {CommentHttpService} from "../comment-http.service";
import {Task} from "../../../shared/models/task";
import {PageEvent} from "@angular/material";

@Component({
    selector: 'comment-list-component',
    template: `        
        <div *ngFor="let comment of comments">
            <mat-card>
                <mat-card-subtitle class="comment-list__subtitle">
                    <div class="comment-list__comment-user">
                        <mat-icon aria-hidden="false" aria-label="person icon">person</mat-icon>
                        <span>{{comment.authorName + ' ' + comment.authorSurname}}</span>
                        <span *ngIf="comment.commentAuthorName" class="comment-list__reply-comment-user">
                            <mat-icon class="mirror" aria-hidden="false" aria-label="reply icon">reply</mat-icon>
                            <span>{{comment.commentAuthorName + ' ' + comment.commentAuthorSurname}}</span>
                        </span>
                    </div>
                    <div>{{comment.creationTimestamp}}</div>
                </mat-card-subtitle>
                <mat-card-content>
                    {{comment.text}}
                </mat-card-content>
                <mat-card-actions>
                    <button mat-stroked-button (click)="onReply(comment)">Respond</button>
                </mat-card-actions>
            </mat-card>
            <br>
        </div>
        <div>
            <mat-paginator [length]="page.length ? page.length : 0"
                           [pageSizeOptions]="[5, 10, 20]"
                           [pageSize]="page.size"
                           [pageIndex]="page.number"
                           (page)="onChangePage($event)"
                           showFirstLastButtons>
            </mat-paginator>
        </div>
    `,
    styles: [`
        .comment-list__subtitle {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .mirror {
            transform: scale(-1, 1);
        }
        
        .comment-list__comment-user {
            display: flex;
            align-items: center;
        }
        
        .comment-list__reply-comment-user {
            display: flex;
            align-items: center;
        }
    `]
})
export class CommentListComponent {
    private task: Task;
    private comments: Comment[] = [];
    private startPage: Page = {
        length: 0,
        size: 5,
        number: 0,
    } as Page;

    private page: Page = this.startPage;

    @Input() set taskInfo(task: Task) {
        this.task = task;
        this.findAllByTaskId(task);
    }

    @Input() set refreshing(refreshing: boolean) {
        if (refreshing) {
            this.refresh();
        }
    }

    @Output() afterRefreshed: EventEmitter<boolean> = new EventEmitter();
    @Output() replyComment: EventEmitter<Comment> = new EventEmitter();

    constructor(private commentHttpService: CommentHttpService) {}

    refresh() {
        this.findAllByTaskId(this.task);
        this.afterRefreshed.emit(false);
    }

    findAllByTaskId(task: Task) {
        console.log(task);
        this.commentHttpService.findAllByTaskId(task, this.page)
            .subscribe((data: any) => {
                console.log(data);
                this.comments = data.comments;
                this.page = data.page;
            })
    }

    onChangePage(pageEvent: PageEvent) {
        this.page.size = pageEvent.pageSize;
        this.page.number = pageEvent.pageIndex;

        console.log(this.page);
        this.findAllByTaskId(this.task);
    }

    onReply(replyComment: Comment) {
        this.replyComment.emit(replyComment);
    }
}
