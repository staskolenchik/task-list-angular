import {Component, OnInit} from "@angular/core";
import {Task} from "../../../../shared/models/task";
import {TaskType} from "../../../../shared/models/task-type";
import {Employee} from "../../../../shared/models/employee";
import {Manager} from "../../../../shared/models/manager";
import {EmployeeService} from "../../../employees/employee.service";
import {Router} from "@angular/router";
import {TaskDataService} from "../../task-data.service";
import {TaskHttpService} from "../../task-http.service";
import {TaskSortStatusService} from "../../task-sort-status.service";

@Component({
    selector: 'task-form-component',
    template: `
        <div class="task-form">
            <mat-card class="mat-elevation-z8">
                <mat-card-title>Task Form</mat-card-title>
                <mat-card-content>
                    <form>
                        <mat-form-field class="task-form__form-field">
                            <input matInput
                                   placeholder="Subject"
                                   autofocus
                                   name="subject"
                                   [(ngModel)]="task.subject"/>
                        </mat-form-field>
    
                        <mat-form-field class="task-form__form-field">
                            <textarea matInput
                                      placeholder="Description"
                                      name="description"
                                      [(ngModel)]="task.description"></textarea>
                        </mat-form-field>
    
                        <label id="task-type-label" class="task-form__label-radio-button">Choose type</label>
                        <mat-radio-group aria-labelledby="task-type-label"
                                         class="task-form__radio-button-group"
                                         name="taskType"
                                         [(ngModel)]="task.type" 
                                         [disabled]="updatable">
                            <mat-radio-button *ngFor="let type of taskTypes"
                                              class="task-form__radio-button"
                                              [value]="type"
                            >{{type}}</mat-radio-button>
                        </mat-radio-group>
    
                        <mat-form-field class="task-form__form-field">
                            <mat-label>Assignee</mat-label>
                            <mat-select name="assignee" 
                                        [(ngModel)]="task.assigneeId" 
                                        [disabled]="updatable">
                                <mat-option *ngFor="let assignee of assignees" [value]="assignee.id">
                                    {{assignee.name}} {{assignee.surname}} {{assignee.patronymic}}
                                </mat-option>
                            </mat-select>
                        </mat-form-field>
                    </form>
                </mat-card-content>
                <mat-card-actions>
                    <button mat-raised-button
                            color="primary"
                            (click)="save(task)"
                    >Save
                    </button>
                    <button mat-raised-button
                            color="warn"
                            (click)="goToTasks()"
                    >Cancel
                    </button>
                </mat-card-actions>
            </mat-card>
        </div>
    `,
    styles: [`
        .task-form__form-field,
        .task-form__label-radio-button,
        .task-form__radio-button-group {
            display: block;
        }

        .task-form__radio-button-group {
            padding: 10px 0;
        }
        
        .task-form__radio-button {
            padding: 0 10px;
        }
        .task-form {
            padding: 30px;
        }
    `],
    providers: [EmployeeService]
})

export class TaskFormComponent implements OnInit{
    private taskTypes: TaskType[] = [TaskType.STORY, TaskType.ISSUE];

    private assignees: Employee[];
    private task: Task;
    private updatable: boolean;
    private manager: Manager = {} as Manager;

    constructor(
        private taskDataService: TaskDataService,
        private tasksHttpService: TaskHttpService,
        private taskSortStatusService: TaskSortStatusService,
        private employeeService: EmployeeService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getEmployees();
        this.isUpdatable();
        this.retrieveTaskFromStore();
    }

    save(task: Task) {
        this.task.createdById = 2;

        if (this.updatable) {
            this.update(task);
        } else {
            this.add(task);
        }
    }

    add(task: Task) {
        this.tasksHttpService
            .add(task)
            .subscribe(addedTasks => {
                this.clearTaskFromStore();
                this.clearUpdatable();
                this.goToTasks();
            });
    }

    update(task: Task) {
        this.tasksHttpService
            .update(task)
            .subscribe(updatedTask => {
                this.clearTaskFromStore();
                this.clearUpdatable();
                this.goToTasks();
            });
    }

    goToTasks() {
        this.router.navigate(['/tasks']);
    }

    clearUpdatable() {
        this.taskDataService.setUpdatable(false);
    }

    isUpdatable() {
        this.taskDataService.isUpdatable()
            .subscribe(updatable => {
                this.updatable = updatable;
            })
    }

    getEmployees() {
        this.manager.id = 2;

        this.employeeService
            .getEmployeesByManagerId(this.manager)
            .subscribe(assignees => this.assignees = assignees);
    }

    clearTaskFromStore() {
        this.taskDataService.setTask({} as Task);
    }

    retrieveTaskFromStore() {
        this.taskDataService.getTask()
            .subscribe((task: Task) => {
                this.task = task;
            })
    }
}
