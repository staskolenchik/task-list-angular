import {Task} from "../../../../shared/models/task";
import {Router} from "@angular/router";
import {TaskSortStatusService} from "../../task-sort-status.service";
import {TaskHttpService} from "../../task-http.service";
import {TaskDataService} from "../../task-data.service";
import {Component, OnInit} from "@angular/core";
import {Page} from "../../../../shared/models/page";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
    selector: 'task-list-manager-component',
    template: `
        <div class="new-task-list-manager__new-task-button">
            <button mat-raised-button color="primary" (click)="openForm()">New Task</button>
        </div>
        <div class="task-list__outer-card-layer">
            <task-list-employee-component></task-list-employee-component>
            <task-list-manager-table-component class="task-list__manager-table" 
                                               (update)="update($event)"
                                               (updateForm)="updateForm($event)"
                                               (delete)="delete($event)"
                                               (deleteAll)="deleteAll($event)"
                                               (showInfo)="showInfo($event)"
                                               [inReviewTasks]="inReviewTasks"
                                               [page]="page"
                                               (changePage)="onChangePage($event)"
                                               [selection]="selection"
            ></task-list-manager-table-component>
        </div>
    `,
    styles: [`
        .task-list__manager-table {
            padding: 30px;
        }
        .task-list__outer-card-layer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .new-task-list-manager__new-task-button {
            margin: 30px 30px 0 30px;
        }
    `]
})
export class TaskListManagerComponent implements OnInit{

    private inReviewTasks: Task [];
    private page: Page = {
        size: 10,
        number: 0,
    } as Page;
    private selection = new SelectionModel<Task>(true, []);

    constructor(
        private taskDataService: TaskDataService,
        private taskHttpService: TaskHttpService,
        private taskSortStatusService: TaskSortStatusService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.findAll(this.page, {statuses: ['IN_REVIEW']});
    }

    findAll(page: Page, filter: any) {
        this.taskHttpService.findAll(page, filter)
            .subscribe((response) => {
                this.inReviewTasks = response.content;
                this.page = response.page;
                this.selection.clear();
            });
    }

    onChangePage(data: any) {
        this.findAll(data.changedPage, data.filter);
    }

    updateForm(task: Task) {
        this.taskDataService.setTask(task);
        this.taskDataService.setUpdatable(true);

        this.openForm();
    }

    openForm() {
        this.router.navigate(['/tasks/task-form']);
    }

    update(task: Task) {
        this.taskHttpService
            .update(task)
            .subscribe(
                (updatedTask: Task) => {
                    this.inReviewTasks = this.taskSortStatusService.removeTask(task, this.inReviewTasks);
                }
            );
    }

    delete(task: Task) {
        this.taskHttpService
            .delete(task)
            .subscribe(response => {
                this.inReviewTasks = this.taskSortStatusService.removeTask(task, this.inReviewTasks);
            });
    }

    deleteAll(tasks: Task[]) {
        this.taskHttpService
            .deleteAll(tasks)
            .subscribe(() => {
                this.findAll(this.page, {statuses: ['IN_REVIEW']})
            });
    }

    showInfo(task: Task) {
        this.taskDataService.setTask(task);
        this.router.navigate([`tasks/${task.id}`]);
    }
}

