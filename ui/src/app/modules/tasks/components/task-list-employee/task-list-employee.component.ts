import {Task} from "../../../../shared/models/task";
import {Router} from "@angular/router";
import {Component} from "@angular/core";
import {TaskSortStatusService} from "../../task-sort-status.service";
import {TaskHttpService} from "../../task-http.service";
import {TaskDataService} from "../../task-data.service";
import {Page} from "../../../../shared/models/page";

@Component({
    selector: 'task-list-employee-component',
    template: `
        <div class="new-task-list-employee-table">
            <task-list-employee-table-component [currentTasks]="currentTasks" 
                                                (updateForm)="updateForm($event)"
                                                (delete)="delete($event)"
                                                (update)="update($event)"
                                                (showInfo)="showInfo($event)"
                                                [page]="page"
                                                (changePage)="onChangePage($event)"
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
    private currentTasks: Task[];
    private page: Page = {
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
        this.findAll(this.page, {statuses: ['TODO', 'IN_PROGRESS']});
    }

    findAll(page: Page, filter: any) {
        this.taskHttpService.findAll(page, filter)
            .subscribe((response) => {
                this.currentTasks = response.content;
                this.page = response.page;
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

    delete(task: Task) {
        this.taskHttpService
            .delete(task)
            .subscribe(response => {
                this.currentTasks = this.taskSortStatusService.removeTask(task, this.currentTasks);
            });
    }

    update(task: Task) {
        this.taskHttpService
            .update(task)
            .subscribe(
                (updatedTask: Task) => {
                    this.currentTasks = this.taskSortStatusService.removeTask(task, this.currentTasks);
                }
            );
    }

    showInfo(task: Task) {
        this.taskDataService.setTask(task);
        this.router.navigate([`tasks/${task.id}`]);
    }
}
