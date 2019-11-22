import {Task} from "../../../../shared/models/task";
import {Router} from "@angular/router";
import {TaskSortStatusService} from "../../task-sort-status.service";
import {TaskHttpService} from "../../task-http.service";
import {TaskDataService} from "../../task-data.service";
import {Component} from "@angular/core";
import {Page} from "../../../../shared/models/page";

@Component({
    selector: 'task-list-manager-component',
    template: `
        <div class="new-task-list-manager__new-task-button">
            <button mat-raised-button color="primary" (click)="openForm()">New Task</button>
        </div>
        <div class="task-list task-list__outer-card-layer">
            <task-list-employee-table-component (update)="update($event)"
                                                (updateForm)="updateForm($event)"
                                                (delete)="delete($event)"
                                                (showInfo)="showInfo($event)"
                                                [currentTasks]="currentTasks"
                                                [page]="pageCurrentTasks"
                                                (changePage)="onChangePageCurrentTasks($event)"
            ></task-list-employee-table-component>
            <task-list-manager-table-component (update)="update($event)"
                                               (updateForm)="updateForm($event)"
                                               (delete)="delete($event)"
                                               (showInfo)="showInfo($event)"
                                               [inReviewTasks]="inReviewTasks"
                                               [page]="pageInReviewTasks"
                                               (changePage)="onChangePageInReveiwTasks($event)"
            ></task-list-manager-table-component>
        </div>
    `,
    styles: [`
        .task-list {
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
export class TaskListManagerComponent {

    private currentTasks: Task [];
    private inReviewTasks: Task [];
    private pageCurrentTasks: Page = {
        size: 10,
        number: 0,
    } as Page;
    private pageInReviewTasks: Page = {
        size: 10,
        number: 0,
    } as Page;

    constructor(
        private taskDataService: TaskDataService,
        private taskHttpService: TaskHttpService,
        private taskSortStatusService: TaskSortStatusService,
        private router: Router
    ) {}

    ngOnInit(): void {
        //this.getAll();
        this.findAll(this.pageCurrentTasks, {statuses: ['TODO', 'IN_PROGRESS']});
        this.findAllinReviewTasks(this.pageInReviewTasks, {statuses: ['IN_REVIEW']});
    }

    findAll(page: Page, filter: any) {
        this.taskHttpService.findAll(page, filter)
            .subscribe((response) => {
                this.currentTasks = response.content;
                this.pageCurrentTasks.size = response.size;
                this.pageCurrentTasks.number = response.number;
                this.pageCurrentTasks.length = response.totalElements;
            });
    }

    findAllinReviewTasks(page: Page, filter: any) {
        this.taskHttpService.findAll(page, filter)
            .subscribe((response) => {
                this.inReviewTasks = response.content;
                this.pageInReviewTasks.size = response.size;
                this.pageInReviewTasks.number = response.number;
                this.pageInReviewTasks.length = response.totalElements;
            });
    }

    onChangePageCurrentTasks(data: any) {
        console.log(data.changedPage);

        this.findAll(data.changedPage, data.filter);
    }

    onChangePageInReveiwTasks(data: any) {
        console.log(data.changedPage);
        this.findAllinReviewTasks(data.changedPage, data.filter);
    }

    getAll() {
        this.taskHttpService
            .getAll()
            .subscribe(allTasks => {
                this.currentTasks = this.taskSortStatusService.filterByTodoOrInProgressStatus(allTasks);
                this.inReviewTasks = this.taskSortStatusService.filterByReviewStatus(allTasks);
            });
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
                    this.currentTasks = this.taskSortStatusService.updateCurrentTasks(task, updatedTask, this.currentTasks);
                    this.inReviewTasks = this.taskSortStatusService.updateInReviewTasks(task, updatedTask, this.inReviewTasks);
                }
            );
    }

    delete(task: Task) {
        this.taskHttpService
            .delete(task)
            .subscribe(response => {
                this.currentTasks = this.taskSortStatusService.removeTask(task, this.currentTasks);
                this.inReviewTasks = this.taskSortStatusService.removeTask(task, this.inReviewTasks);
            });
    }

    showInfo(task: Task) {
        this.taskDataService.setTask(task);
        this.router.navigate([`tasks/${task.id}`]);
    }
}

