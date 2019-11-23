import {Task} from "../../../../shared/models/task";
import {Router} from "@angular/router";
import {Component} from "@angular/core";
import {TaskHttpService} from "../../task-http.service";
import {TaskDataService} from "../../task-data.service";
import {Page} from "../../../../shared/models/page";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
    selector: 'task-list-employee-component',
    template: `
        <div class="new-task-list-employee-table">
            <task-list-employee-table-component [currentTasks]="tasks" 
                                                (updateForm)="updateForm($event)"
                                                (delete)="delete($event)"
                                                (deleteAll)="deleteAll($event)"
                                                (update)="update($event)"
                                                (showInfo)="showInfo($event)"
                                                [page]="page"
                                                (changePage)="onChangePage($event)"
                                                [selection]="selection"
            >Loading...</task-list-employee-table-component>
        </div>
    `,
    styles: [`
        .new-task-list-employee-table {
            padding: 30px;
        }
    `]

})
export class TaskListEmployeeComponent {

    private tasks: Task[];
    private page: Page;
    private selection = new SelectionModel<Task>(true, []);
    private filter = {statuses: ['TODO', 'IN_PROGRESS']};

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

    update(task: Task): void {
        this.taskHttpService
            .update(task)
            .subscribe(() => {
                    this.findAll(this.page, this.filter);
                }
            );
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
