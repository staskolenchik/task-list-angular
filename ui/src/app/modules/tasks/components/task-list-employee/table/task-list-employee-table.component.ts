import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Task} from "../../../../../shared/models/task";
import {DeletePermissionComponent} from "../../../../../shared/modal-dialogs/delete-permission/delete-permission.component";
import {MatDialog, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {Page} from "../../../../../shared/models/page";

@Component({
    selector: 'task-list-employee-table-component',
    template: `
        <div class="task-list__todo-table-card">
            <mat-card class="mat-elevation-z8">
                <mat-card-title>Assignee's table</mat-card-title>
                <table mat-table 
                       [dataSource]="taskDataSource" 
                       matSort 
                       class="task-list__todo-table">
                    <ng-container matColumnDef="subject">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header>Subject</th>
                        <td mat-cell *matCellDef="let task">{{task.subject}}</td>
                    </ng-container>

                    <ng-container matColumnDef="assigneeName">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header>Assignee</th>
                        <td mat-cell *matCellDef="let task">
                            {{task.assigneeName}} {{task.assigneeSurname}}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="status">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                        <td mat-cell *matCellDef="let task">
                            <mat-form-field>
                                <mat-select [(value)]="task.status"
                                            (selectionChange)="onUpdate(task)">
                                    <mat-option value="TODO">TODO</mat-option>
                                    <mat-option value="IN_PROGRESS">IN PROGRESS</mat-option>
                                    <mat-option value="IN_REVIEW">IN REVIEW</mat-option>
                                </mat-select>
                            </mat-form-field>
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="type">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header>Type</th>
                        <td mat-cell *matCellDef="let task">{{task.type}}</td>
                    </ng-container>

                    <ng-container matColumnDef="creationDateTime">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header>Created at</th>
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
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                </table>
                <mat-paginator [length]="page.length ? page.length : 0"
                               [pageSizeOptions]="[5, 10, 20]" 
                               [pageSize]="page.size"
                               (page)="onChangePage($event)"
                               showFirstLastButtons></mat-paginator>
            </mat-card>
        </div>
    `,
    styles: [`
        .task-list__todo-table-card {
            min-width: 900px;
        }
        .task-list__todo-table {
            width: 100%;
        }
    `],
    providers: []
})
export class TaskListEmployeeTableComponent {
    private displayedColumns = ['subject', 'assigneeName', 'status', 'type', 'creationDateTime', 'options'];

    private taskDataSource: any;

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    @Input()
    set currentTasks(tasks: Task[]) {
        this.taskDataSource = new MatTableDataSource(tasks);
        this.taskDataSource.sort = this.sort;
    }

    @Input() private page: Page;

    @Output() updateForm: EventEmitter<Task> = new EventEmitter();
    @Output() delete: EventEmitter<Task> = new EventEmitter();
    @Output() update: EventEmitter<Task> = new EventEmitter();
    @Output() showInfo: EventEmitter<Task> = new EventEmitter();
    @Output() changePage: EventEmitter<any> = new EventEmitter();

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

    onChangePage(pageEvent: PageEvent) {
        const changedPage: Page = {
            length: null,
            size: pageEvent.pageSize,
            number: pageEvent.pageIndex,
        };

        this.changePage.emit({changedPage, filter : {statuses: ['TODO', 'IN_PROGRESS']}});
    }
}
