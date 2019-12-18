import {Component, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";
import {Task} from "../../../../../shared/models/task";
import {MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {Page} from "../../../../../shared/models/page";
import {TaskStatus} from "../../../../../shared/models/task-status";
import {TaskHttpService} from "../../../task-http.service";
import {DateFormat} from "../../../../../shared/constants/date-format";

@Component({
    selector: 'todo-inprogress-task-list-table-component',
    template: `
        <div class="task-list__todo-table-card">
            <mat-card class="mat-elevation-z8">
                <mat-card-title>My Current Tasks</mat-card-title>
                <table mat-table 
                       [dataSource]="taskDataSource" 
                       matSort 
                       class="task-list__todo-table">
                    
                    <ng-container matColumnDef="subject">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header>Subject</th>
                        <td mat-cell *matCellDef="let task">{{task.subject}}</td>
                    </ng-container>

                    <ng-container matColumnDef="status">
                        <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                        <td mat-cell *matCellDef="let task">
                            <mat-form-field>
                                <mat-select [(value)]="task.status"
                                            (selectionChange)="onChangeStatus(task)">
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
                        <td mat-cell *matCellDef="let task">{{task.creationDateTime | date: dateFormat.timestamp}}</td>
                    </ng-container>

                    <ng-container matColumnDef="options">
                        <th mat-header-cell *matHeaderCellDef>Options</th>
                        <td mat-cell *matCellDef="let task">
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
                    <mat-paginator [length]="page.length ? page.length : 0"
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
    styleUrls: ['./todo-inprogress-task-list-table.component.css']
})
export class TodoInprogressTaskListTableComponent implements OnInit {
    private dateFormat = DateFormat;

    private displayedColumns = ['subject', 'status', 'type', 'creationDateTime', 'options'];
    private page: Page = {
        length: 0,
        size: 10,
        number: 0
    } as Page;
    private filter = {
        statuses: [
            TaskStatus.TODO,
            TaskStatus.INPROGRESS
        ],
        assigneeId: localStorage.getItem('uid'),
    };
    private taskDataSource: MatTableDataSource<Task> = new MatTableDataSource([]);

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    @Output() transferShow: EventEmitter<Task> = new EventEmitter();

    constructor(private taskHttpService: TaskHttpService) {}

    ngOnInit(): void {
        this.findAll(this.page, this.filter);
        this.taskDataSource.sort = this.sort;
    }

    findAll(page: Page, filter: any): void {
        this.taskHttpService.findAllForEmployee(page, filter)
            .subscribe((response) => {
                this.taskDataSource = new MatTableDataSource(response.content);
                this.taskDataSource.sort = this.sort;
                this.page = response.page;
            });
    }

    onShowInfo(task: Task): void {
        this.transferShow.emit(task);
    }

    onChangePage(pageEvent: PageEvent): void {
        this.page = {
            length: null,
            size: pageEvent.pageSize,
            number: pageEvent.pageIndex
        };

        this.findAll(this.page, this.filter);
    }

    onChangeStatus(task: Task) {
        this.taskHttpService.update(task)
            .subscribe(() => this.findAll(this.page, this.filter));
    }
}
