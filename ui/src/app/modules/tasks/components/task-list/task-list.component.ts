import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Task} from "../../../../shared/models/task";

@Component({
    selector: 'task-list-component',
    template: `
        <mat-card class="mat-elevation-z8 task-list__outer-card-layer">
            <div class="task-list__todo-table-card">
                <mat-card class="mat-elevation-z2">
                    <mat-card-title>Table1</mat-card-title>
                    <table mat-table [dataSource]="currentTasks"
                           class="task-list__todo-table">
                        <ng-container matColumnDef="subject">
                            <th mat-header-cell *matHeaderCellDef>Subject</th>
                            <td mat-cell *matCellDef="let task">{{task.subject}}</td>
                        </ng-container>

                        <ng-container matColumnDef="assignee">
                            <th mat-header-cell *matHeaderCellDef>Assignee</th>
                            <td mat-cell *matCellDef="let task">
                                {{task.assigneeName}} {{task.assigneeSurname}}
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="status">
                            <th mat-header-cell *matHeaderCellDef>Status</th>
                            <td mat-cell *matCellDef="let task">
                                <mat-form-field>
                                    <mat-select [(value)]="task.status" (selectionChange)="onChangeStatus(task)">
                                        <mat-option value="TODO">TODO</mat-option>
                                        <mat-option value="IN_PROGRESS">IN PROGRESS</mat-option>
                                        <mat-option value="IN_REVIEW">IN REVIEW</mat-option>
                                    </mat-select>
                                </mat-form-field>
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="type">
                            <th mat-header-cell *matHeaderCellDef>Type</th>
                            <td mat-cell *matCellDef="let task">{{task.type}}</td>
                        </ng-container>

                        <ng-container matColumnDef="creationDateTime">
                            <th mat-header-cell *matHeaderCellDef>Created at</th>
                            <td mat-cell *matCellDef="let task">{{task.creationDateTime}}</td>
                        </ng-container>

                        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                    </table>
                </mat-card>
            </div>

            <div class="task-list__in-review-table-card">
                <mat-card class="mat-elevation-z2 ">
                    <mat-card-title>Table2</mat-card-title>
                    <table mat-table [dataSource]="inReviewTasks" class="task-list__in-review-table">
                        <ng-container matColumnDef="subject">
                            <th mat-header-cell *matHeaderCellDef>Subject</th>
                            <td mat-cell *matCellDef="let task">{{task.subject}}</td>
                        </ng-container>

                        <ng-container matColumnDef="assignee">
                            <th mat-header-cell *matHeaderCellDef>Assignee</th>
                            <td mat-cell *matCellDef="let task">
                                {{task.assigneeName}} {{task.assigneeSurname}}
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="status">
                            <th mat-header-cell *matHeaderCellDef>Status</th>
                            <td mat-cell *matCellDef="let task">
                                <mat-form-field>
                                    <mat-select [(value)]="task.status" (selectionChange)="onChangeStatus(task)">
                                        <mat-option value="IN_PROGRESS">IN PROGRESS</mat-option>
                                        <mat-option value="IN_REVIEW">IN REVIEW</mat-option>
                                        <mat-option value="DONE">DONE</mat-option>
                                    </mat-select>
                                </mat-form-field>
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="type">
                            <th mat-header-cell *matHeaderCellDef>Type</th>
                            <td mat-cell *matCellDef="let task">{{task.type}}</td>
                        </ng-container>

                        <ng-container matColumnDef="creationDateTime">
                            <th mat-header-cell *matHeaderCellDef>Created at</th>
                            <td mat-cell *matCellDef="let task">{{task.creationDateTime}}</td>
                        </ng-container>

                        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                        <tr mat-row *matRowDef="let row; columns: displayedColumns;">
                    </table>
                </mat-card>
            </div>
        </mat-card>
    `,
    styles: [`
        .task-list__outer-card-layer {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            min-width: 370px;
        }
        .task-list__todo-table-card,
        .task-list__in-review-table-card {
            min-width: 350px;
            width: 47%;
            margin: 0 10px;
        }
        .task-list__todo-table,
        .task-list__in-review-table {
            width: 100%;
        }
    `]
})

export class TaskListComponent {
    private displayedColumns = ['subject', 'assignee', 'status', 'type', 'creationDateTime'];

    @Input() private currentTasks: Task[];
    @Input() private inReviewTasks: Task[];

    @Output() changeStatus: EventEmitter<Task> = new EventEmitter();

    onChangeStatus(task: Task) {
        this.changeStatus.emit(task);
    }
}
