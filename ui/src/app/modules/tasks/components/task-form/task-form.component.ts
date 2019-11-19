import {Component, OnInit} from "@angular/core";
import {Task} from "../../../../shared/models/task";
import {Employee} from "../../../../shared/models/employee";
import {Manager} from "../../../../shared/models/manager";
import {EmployeeService} from "../../../employees/employee.service";
import {Router} from "@angular/router";
import {TaskDataService} from "../../task-data.service";
import {TaskHttpService} from "../../task-http.service";
import {TaskSortStatusService} from "../../task-sort-status.service";
import {Location} from '@angular/common';

import {FieldLength} from "../../../../shared/constants/field-length";
import {TaskTypes} from "../../../../shared/constants/task-types";
import {Errors} from "../../../../shared/constants/errors";
import {Hints} from "../../../../shared/constants/hints";

@Component({
    selector: 'task-form-component',
    template: `
        <div class="task-form">
            <form #form="ngForm" (ngSubmit)="save(task)">
                <mat-card class="mat-elevation-z8">
                    <mat-card-title>Task Form</mat-card-title>
                    <mat-card-content>
                        <mat-form-field class="task-form__form-field">
                            <input id="subject"
                                   matInput
                                   placeholder="Subject"
                                   required
                                   autofocus
                                   name="subject"
                                   [(ngModel)]="task.subject"
                                   #subject="ngModel"
                                   [maxLength]="fieldLength.TASK_SUBJECT"/>
                            <button mat-button *ngIf="task.subject"
                                    matSuffix mat-icon-button
                                    aria-label="Clear"
                                    (click)="task.subject=''">
                                <mat-icon>close</mat-icon>
                            </button>
                            <mat-hint align="start" *ngIf="subject.valid">
                                {{hints.MAX_LENGTH(fieldLength.TASK_SUBJECT)}}
                            </mat-hint>
                            <mat-hint align="end">
                                {{task.subject ? task.subject.length : 0}} / {{fieldLength.TASK_SUBJECT}}
                            </mat-hint>
                            <mat-error align="start"
                                       *ngIf="subject.invalid && (subject.dirty || subject.touched)"
                            >{{errors.FIELD_IS_REQUIRED}}</mat-error>
                        </mat-form-field>

                        <mat-form-field class="task-form__form-field">
                            <textarea matInput
                                      class="task-form__description"
                                      placeholder="Description"
                                      #description="ngModel"
                                      name="description"
                                      rows="3"
                                      [(ngModel)]="task.description"
                                      [maxLength]="fieldLength.TASK_DESCRIPTION"></textarea>
                            <button mat-button *ngIf="task.description"
                                    matSuffix mat-icon-button
                                    aria-label="Clear"
                                    (click)="task.description=''">
                                <mat-icon>close</mat-icon>
                            </button>
                            <mat-hint align="start" *ngIf="description.valid">
                                {{hints.MAX_LENGTH(fieldLength.TASK_DESCRIPTION)}}
                            </mat-hint>
                            <mat-hint align="end">
                                {{task.description ? task.description.length : 0}} / {{fieldLength.TASK_DESCRIPTION}}
                            </mat-hint>
                        </mat-form-field>

                        <mat-form-field class="task-form__form-field">
                            <input matInput
                                   placeholder="Type"
                                   required
                                   readonly
                                   value="{{task.type ? task.type : ''}}">
                            <mat-hint align="start" *ngIf="type.valid || type.untouched">
                                {{hints.CHOOSE_TASK_TYPE}}
                            </mat-hint>
                            <mat-error align="start" *ngIf="type.invalid">
                                {{errors.FIELD_IS_REQUIRED}}
                            </mat-error>
                        </mat-form-field>
                        <mat-radio-group aria-labelledby="task-type-label"
                                         required
                                         class="task-form__radio-button-group"
                                         name="taskType"
                                         #type="ngModel"
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
                                        required
                                        [(ngModel)]="task.assigneeId"
                                        [disabled]="updatable">
                                <mat-option *ngFor="let assignee of assignees" 
                                            [value]="assignee.id">
                                    {{assignee.name}} {{assignee.surname}} {{assignee.patronymic}}
                                </mat-option>
                            </mat-select>
                            <mat-hint align="start" *ngIf="!task.assigneeId">
                                {{hints.CHOOSE_TASK_ASSIGNEE}}
                            </mat-hint>
                            <mat-error align="start" >{{errors.FIELD_IS_REQUIRED}}</mat-error>
                        </mat-form-field>
                    </mat-card-content>
                    <mat-card-actions>
                        <button type="submit"
                                mat-raised-button
                                color="primary"
                                [disabled]="form.invalid"
                        >Save</button>
                        <button type="button"
                                mat-raised-button
                                color="warn"
                                (click)="goBack()"
                        >Cancel</button>
                    </mat-card-actions>
                </mat-card>
            </form>
        </div>
    `,
    styleUrls: [`./task-form.component.css`],
    providers: [EmployeeService]
})

export class TaskFormComponent implements OnInit{
    private fieldLength = FieldLength;
    private taskTypes = TaskTypes;
    private errors = Errors;
    private hints = Hints;

    private assignees: Employee[];
    private task: Task;
    private updatable: boolean;
    private manager: Manager = {} as Manager;

    constructor(
        private taskDataService: TaskDataService,
        private tasksHttpService: TaskHttpService,
        private taskSortStatusService: TaskSortStatusService,
        private employeeService: EmployeeService,
        private router: Router,
        private location: Location
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

    goBack() {
        this.taskDataService.setTask({} as Task);
        this.location.back();
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
