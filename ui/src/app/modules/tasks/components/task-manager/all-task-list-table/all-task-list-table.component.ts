import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {MatDialog, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {Task} from "../../../../../shared/models/task";
import {DeletePermissionComponent} from "../../../../../shared/modal-dialogs/delete-permission/delete-permission.component";
import {DeleteAllPermissionComponent} from "../../../../../shared/modal-dialogs/delete-all-permission/delete-all-permission.component";
import {Page} from "../../../../../shared/models/page";
import {SelectionModel} from "@angular/cdk/collections";
import {TaskHttpService} from "../../../task-http.service";
import {Router} from "@angular/router";
import {TaskStatus} from "../../../../../shared/models/task-status";
import {Employee} from "../../../../../shared/models/employee";
import {TaskFilter} from "../../../../../shared/models/task-filter";
import {DateFormat} from "../../../../../shared/constants/date-format";

@Component({
    selector: 'all-task-list-table-component',
    template: `
        <div class="task-list__all-task-list-table-card">
            <mat-card class="mat-elevation-z8 ">
                <mat-card-title>Filter</mat-card-title>
                <filter-component (employees)="filterByEmployees($event)"
                                  (statuses)="filterByStatuses($event)" 
                                  (dateFrom)="filterByDateFrom($event)"
                                  (dateTo)="filterByDateTo($event)"
                ></filter-component>

                <mat-card-title>All Tasks</mat-card-title>
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
                        <td mat-cell *matCellDef="let task">{{task.status}}</td>
                    </ng-container>

                    <ng-container matColumnDef="type">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header>Type</th>
                        <td mat-cell *matCellDef="let task">{{task.type}}</td>
                    </ng-container>

                    <ng-container matColumnDef="creationDateTime">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header>Created at</th>
                        <td mat-cell *matCellDef="let task">{{task.creationDateTime | date: dateFormat.timestamp}}</td>
                    </ng-container>

                    <ng-container matColumnDef="options">
                        <th mat-header-cell *matHeaderCellDef>Update / Delete / Info</th>
                        <td mat-cell *matCellDef="let task">
                            <button mat-icon-button
                                    class="manager-list__option-button"
                                    color="accent"
                                    (click)="onUpdate(task)">
                                <mat-icon aria-label="Update icon">
                                    update
                                </mat-icon>
                            </button>
                            <button mat-icon-button
                                    color="warn"
                                    (click)="askPermission(task)">
                                <mat-icon aria-label="Delete icon">
                                    delete
                                </mat-icon>
                            </button>
                            <button mat-icon-button
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
                                   showFirstLastButtons>
                    </mat-paginator>
                </div>
            </mat-card>
        </div>
    `,
    styleUrls: ['./all-task-list-table.component.css']
})
export class AllTaskListTableComponent {
    private dateFormat = DateFormat;

    private displayedColumns = ['select', 'subject', 'assigneeName', 'status', 'type', 'creationDateTime', 'options'];
    private taskDataSource: MatTableDataSource<Task> = new MatTableDataSource([]);

    private startPage: Page = {
        length: 0,
        size: 10,
        number: 0,
    } as Page;

    private page: Page = this.startPage;

    private filter: TaskFilter = {
        createdBy: localStorage.getItem('uid'),
    } as TaskFilter;

    private selection: SelectionModel<Task> = new SelectionModel<Task>(
        true,
        []
    );

    @Input() set notifyUpdating(value: boolean) {
        if (value) {
            this.findAll(this.startPage, this.filter);
        }
    }

    @Output() transferUpdate: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() transferShow: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() notifyUpdated: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private taskHttpService: TaskHttpService,
        private router: Router,
        private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.findAll(this.startPage, this.filter);
    }

    findAll(page: Page, filter: TaskFilter): void {
        this.taskHttpService.findAll(page, filter)
            .subscribe((response) => {
                this.taskDataSource = new MatTableDataSource(response.content);
                this.taskDataSource.sort = this.sort;
                this.page = response.page;
                this.selection.clear();

                this.notifyUpdated.emit(false);
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
        this.findAll(this.startPage, this.filter);
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

    filterByEmployees(employees: Employee[]) {
        if (employees.length > 0) {
            this.filter.employeeIds = employees.map((employee: Employee) => employee.id);
        } else {
            this.filter.employeeIds = null;
        }

        this.loadTasksFromStartPage();
    }

    filterByStatuses(statuses: TaskStatus[]) {
        if (statuses.length > 0) {
            this.filter.statuses = statuses;
        } else {
            this.filter.statuses = null;
        }

        this.loadTasksFromStartPage();
    }

    filterByDateFrom(dateFrom: Date) {
        if (dateFrom) {
            this.filter.dateFrom = dateFrom;
        } else {
            this.filter.dateFrom = null;
        }

        this.loadTasksFromStartPage();
    }

    filterByDateTo(dateTo: Date) {
        if (dateTo) {
            this.filter.dateTo = dateTo;
        } else {
            this.filter.dateTo = null;
        }

        this.loadTasksFromStartPage();
    }
}
