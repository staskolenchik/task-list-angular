import {Task} from "../../../../shared/models/task";
import {Router} from "@angular/router";
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
                                               [inReviewTasks]="tasks"
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

    private tasks: Task [];
    private page: Page;
    private selection = new SelectionModel<Task>(true, []);
    private filter = {statuses: ['IN_REVIEW']};

    constructor(
        private taskDataService: TaskDataService,
        private taskHttpService: TaskHttpService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getStoredPage();
        this.findAll(this.page, this.filter);
    }

    findAll(page: Page, filter: any): void {
        this.taskHttpService.findAll(page, filter)
            .subscribe((response) => {
                this.tasks = response.content;
                this.page = response.page;
                this.taskDataService.setPage(this.page);
                this.selection.clear();
            });
    }

    onChangePage(changedPage: Page): void {
        this.page = changedPage;
        this.findAll(changedPage, this.filter);
    }

    updateForm(task: Task): void {
        this.taskDataService.setTask(task);
        this.taskDataService.setUpdatable(true);
        this.openForm();
    }

    openForm(): void {
        this.router.navigate(['/tasks/task-form']);
    }

    update(task: Task): void {
        this.taskHttpService
            .update(task)
            .subscribe(() => this.findAll(this.page, this.filter));
    }

    delete(task: Task): void {
        this.taskHttpService
            .delete(task)
            .subscribe(() => this.findAll(this.page, this.filter));
    }

    deleteAll(tasks: Task[]): void {
        this.taskHttpService
            .deleteAll(tasks)
            .subscribe(() => {
                this.loadTasksFromStartPage();
            });
    }

    showInfo(task: Task): void {
        this.taskDataService.setTask(task);
        this.router.navigate([`tasks/${task.id}`]);
    }

    getStoredPage(): void {
        this.taskDataService.getPage().subscribe((page: Page) => {
            this.page = page;
        });
    }

    loadTasksFromStartPage(): void {
        this.page.number = 0;
        this.findAll(this.page, this.filter);
    }
}

