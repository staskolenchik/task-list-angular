import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Task} from "../../../../../shared/models/task";
import {DeletePermissionComponent} from "../../../../../shared/modal-dialogs/delete-permission/delete-permission.component";
import {MatDialog, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {Page} from "../../../../../shared/models/page";
import {SelectionModel} from "@angular/cdk/collections";
import {DeleteAllPermissionComponent} from "../../../../../shared/modal-dialogs/delete-all-permission/delete-all-permission.component";

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
                    <ng-container matColumnDef="select">
                        <th mat-header-cell *matHeaderCellDef>
                            <mat-checkbox (change)="$event ? masterToggle() : null"
                                          [checked]="selection.hasValue() && isAllSelected()"
                                          [indeterminate]="selection.hasValue() && !isAllSelected()"
                                          [aria-label]="checkboxLabel()">
                            </mat-checkbox>
                        </th>
                        <td mat-cell *matCellDef="let task">
                            <mat-checkbox (click)="$event.stopPropagation()"
                                          (change)="$event ? this.selection.toggle(task) : null"
                                          [checked]="selection.isSelected(task)"
                                          [aria-label]="checkboxLabel(task)">
                            </mat-checkbox>
                        </td>
                    </ng-container>
                    
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
                <div class="task-list__footer">
                    <button mat-raised-button
                            [disabled]="selection.isEmpty()"
                            (click)="askDeleteAllPermission()"
                            color="warn"
                    >Delete selected</button>
                    <mat-paginator [length]="page.length ? page.length : 0"
                                   [pageSizeOptions]="[5, 10, 20]"
                                   [pageSize]="page.size"
                                   [pageIndex]="page.number"
                                   (page)="onChangePage($event)"
                                   showFirstLastButtons></mat-paginator>
                </div>
            </mat-card>
        </div>
    `,
    styles: [`
        .task-list__todo-table-card {
            min-width: 850px;
        }
        .task-list__todo-table {
            width: 100%;
        }
        .task-list__footer {
            padding: 15px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .mat-cell {
            padding: 0 5px;
        }
    `],
    providers: []
})
export class TaskListEmployeeTableComponent {
    private displayedColumns = ['select', 'subject', 'assigneeName', 'status', 'type', 'creationDateTime', 'options'];

    private taskDataSource: MatTableDataSource<Task>;

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    @Input()
    set currentTasks(tasks: Task[]) {
        this.taskDataSource = new MatTableDataSource(tasks);
        this.taskDataSource.sort = this.sort;
    }

    @Input() private page: Page;
    @Input() private selection: SelectionModel<Task>;

    @Output() updateForm: EventEmitter<Task> = new EventEmitter();
    @Output() delete: EventEmitter<Task> = new EventEmitter();
    @Output() deleteAll: EventEmitter<Task[]> = new EventEmitter();
    @Output() update: EventEmitter<Task> = new EventEmitter();
    @Output() showInfo: EventEmitter<Task> = new EventEmitter();
    @Output() changePage: EventEmitter<Page> = new EventEmitter();

    constructor(private dialog: MatDialog) {}

    onUpdate(task: Task): void {
        this.update.emit(task);
    }

    onUpdateForm(task: Task): void {
        this.updateForm.emit(task);
    }

    onDelete(task: Task): void {
        this.delete.emit(task);
    }

    onDeleteAll(tasks: Task[]): void {
        this.deleteAll.emit(tasks);
    }

    askPermission(task: Task): void {
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

    askDeleteAllPermission(): void {
        const matDialogRef = this.dialog.open(DeleteAllPermissionComponent, {
            height: '210px',
            width: '480px',
            data: {count: this.selection.selected.length}
        });

        matDialogRef.afterClosed().subscribe(isApproved => {
            if (isApproved) {
                this.onDeleteAll(this.selection.selected);
            }
        })
    }

    onShowInfo(task: Task): void {
        this.showInfo.emit(task);
    }

    onChangePage(pageEvent: PageEvent): void {
        const changedPage: Page = {
            length: null,
            size: pageEvent.pageSize,
            number: pageEvent.pageIndex,
        };

        this.changePage.emit(changedPage);
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.taskDataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.taskDataSource.data.forEach((row: any) => this.selection.select(row));
    }

    checkboxLabel(task?: Task): string {
        if (!task) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }

        return `${this.selection.isSelected(task) ? 'deselect' : 'select'} task `;
    }
}
