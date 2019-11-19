import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Task} from "../../../../../shared/models/task";
import {MatDialog} from "@angular/material";
import {DeletePermissionComponent} from "../../../../../shared/modal-dialogs/delete-permission/delete-permission.component";

@Component({
    selector: 'task-list-manager-table-component',
    template: `
        <div class="task-list__in-review-table-card">
            <mat-card class="mat-elevation-z2 ">
                <mat-card-title>Manager's table</mat-card-title>
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
                                <mat-select [(value)]="task.status" (selectionChange)="onUpdate(task)">
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

                    <ng-container matColumnDef="options">
                        <th mat-header-cell *matHeaderCellDef>Options</th>
                        <td mat-cell *matCellDef="let task">
                            <button mat-button
                                    class="manager-list__option-button"
                                    color="accent"
                                    (click)="onUpdateForm(task)">
                                <mat-icon aria-label="Update icon" >
                                    update
                                </mat-icon>
                            </button>
                            <button mat-button
                                    color="warn"
                                    (click)="askPermission(task)">
                                <mat-icon aria-label="Delete icon">
                                    delete
                                </mat-icon>
                            </button>
                            <button mat-button
                                    color="primary"
                                    (click)="onShowInfo(task)">
                                <mat-icon aria-label="Info icon">
                                    info
                                </mat-icon>
                            </button>
                        </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;">
                </table>
            </mat-card>
        </div>
    `,
    styles: [`        
        .task-list__in-review-table-card {
            min-width: 900px;
        }
        .task-list__in-review-table {
            width: 100%;
        }
    `]
})
export class TaskListManagerTableComponent {

    private displayedColumns = ['subject', 'assignee', 'status', 'type', 'creationDateTime', 'options'];

    @Input() private inReviewTasks: Task[];

    @Output() updateForm: EventEmitter<Task> = new EventEmitter();
    @Output() delete: EventEmitter<Task> = new EventEmitter();
    @Output() update: EventEmitter<Task> = new EventEmitter();
    @Output() showInfo: EventEmitter<Task> = new EventEmitter();

    constructor(private dialog: MatDialog) {}

    onUpdate(task: Task) {
        this.update.emit(task);
    }

    onUpdateForm(task: Task) {
        this.updateForm.emit(task);
    }

    onDelete(task: Task) {
        this.delete.emit(task);
    }

    askPermission(task: Task) {
        const matDialogRef = this.dialog.open(DeletePermissionComponent, {
            height: '210px',
            width: '480px',
            data: {subject: task.subject}
        });

        matDialogRef.afterClosed().subscribe(isApproved => {
            if (isApproved) {
                this.onDelete(task);
            }
        })
    }

    onShowInfo(task: Task) {
        this.showInfo.emit(task);
    }
}
