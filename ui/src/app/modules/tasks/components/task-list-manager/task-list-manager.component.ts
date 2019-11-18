import {Task} from "../../../../shared/models/task";
import {Router} from "@angular/router";
import {TaskSortStatusService} from "../../task-sort-status.service";
import {TaskHttpService} from "../../task-http.service";
import {TaskDataService} from "../../task-data.service";
import {Component} from "@angular/core";

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
                                                  [currentTasks]="currentTasks"
                ></task-list-employee-table-component>
                <task-list-manager-table-component (update)="update($event)"
                                                       (updateForm)="updateForm($event)"
                                                       (delete)="delete($event)"
                                                       [inReviewTasks]="inReviewTasks"
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

    constructor(
        private taskDataService: TaskDataService,
        private taskHttpService: TaskHttpService,
        private taskSortStatusService: TaskSortStatusService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getAll();
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
}
