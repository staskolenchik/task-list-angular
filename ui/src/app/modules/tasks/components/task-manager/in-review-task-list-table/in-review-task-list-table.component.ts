import {Component, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";
import {Task} from "../../../../../shared/models/task";
import {MatDialog, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {DeletePermissionComponent} from "../../../../../shared/modal-dialogs/delete-permission/delete-permission.component";
import {Page} from "../../../../../shared/models/page";
import {SelectionModel} from "@angular/cdk/collections";
import {DeleteAllPermissionComponent} from "../../../../../shared/modal-dialogs/delete-all-permission/delete-all-permission.component";
import {TaskHttpService} from "../../../task-http.service";
import {TaskDataService} from "../../../task-data.service";
import {Router} from "@angular/router";
import {TaskStatus} from "../../../../../shared/models/task-status";

@Component({
    selector: 'in-review-task-list-table-component',
    template: `
        <div class="task-list__in-review-table-card">
            <mat-card class="mat-elevation-z8 ">
                <mat-card-title>In Review Tasks</mat-card-title>
                <table mat-table
                       [dataSource]="taskDataSource"
                       matSort
                       class="task-list__in-review-table">
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
                                <mat-select [(value)]="task.status" (selectionChange)="onUpdate(task)">
                                    <mat-option value="IN_PROGRESS">IN PROGRESS</mat-option>
                                    <mat-option value="IN_REVIEW">IN REVIEW</mat-option>
                                    <mat-option value="DONE">DONE</mat-option>
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
                                    (click)="onUpdate(task)">
                                <mat-icon aria-label="Update icon">
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
                <div class="task-list__footer">
                    <button mat-raised-button
                            [disabled]="selection.isEmpty()"
                            (click)="askDeleteAllPermission()"
                            color="warn"
                    >Delete selected
                    </button>
                    <mat-paginator [length]="page.length"
                                   [pageSizeOptions]="[5, 10, 20]"
                                   [pageSize]="page.size"
                                   [pageIndex]="page.number"
                                   (page)="onChangePage($event)"
                                   showFirstLastButtons></mat-paginator>
                </div>
            </mat-card>
        </div>
    `,
    styleUrls: ['./in-review-task-list-table.component.css']
})
export class InReviewTaskListTableComponent implements OnInit {
    private displayedColumns = ['select', 'subject', 'assigneeName', 'status', 'type', 'creationDateTime', 'options'];
    private taskDataSource: MatTableDataSource<Task> = new MatTableDataSource([]);

    private page: Page = {
        length: 0,
        size: 10,
        number: 0,
    } as Page;

    private filter = {statuses: [TaskStatus.INREVIEW]};
    private selection: SelectionModel<Task> = new SelectionModel<Task>(
        true,
        []
    );

    @Output() transferUpdate: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() transferShow: EventEmitter<Task> = new EventEmitter<Task>();

    constructor(
        private taskDataService: TaskDataService,
        private taskHttpService: TaskHttpService,
        private router: Router,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.findAll(this.page, this.filter);
        this.taskDataSource.sort = this.sort;
    }

    findAll(page: Page, filter: any): void {
        this.taskHttpService.findAll(page, filter)
            .subscribe((response) => {
                this.taskDataSource = new MatTableDataSource(response.content);
                this.page = response.page;
                this.selection.clear();
            });
    }

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    onUpdate(task: Task): void {
        this.transferUpdate.emit(task);
    }

    onDelete(task: Task): void {
        this.taskHttpService
            .delete(task)
            .subscribe(() => this.findAll(this.page, this.filter));
    }

    onDeleteAll(tasks: Task[]): void {
        this.taskHttpService
            .deleteAll(tasks)
            .subscribe(() => {
                this.loadTasksFromStartPage();
            });
    }

    askPermission(task: Task): void {
        const matDialogRef = this.dialog.open(DeletePermissionComponent, {
            height: '210px',
            width: '480px',
            data: {item: task.subject}
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
        this.transferShow.emit(task);
    }

    onChangePage(pageEvent: PageEvent): void {
        const changedPage: Page = {
            length: null,
            size: pageEvent.pageSize,
            number: pageEvent.pageIndex,
        };

        this.findAll(changedPage, this.filter);
    }

    loadTasksFromStartPage(): void {
        this.page.number = 0;
        this.findAll(this.page, this.filter);
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
