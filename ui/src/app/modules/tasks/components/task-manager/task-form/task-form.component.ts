import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Task} from "../../../../../shared/models/task";
import {Employee} from "../../../../../shared/models/employee";
import {Manager} from "../../../../../shared/models/manager";
import {EmployeeHttpService} from "../../../../employees/employee-http.service";
import {Router} from "@angular/router";
import {TaskDataService} from "../../../task-data.service";
import {TaskHttpService} from "../../../task-http.service";
import {Location} from '@angular/common';

import {FieldLength} from "../../../../../shared/constants/field-length";
import {TaskTypes} from "../../../../../shared/constants/task-types";
import {Errors} from "../../../../../shared/constants/errors";
import {Hints} from "../../../../../shared/constants/hints";
import {MatSnackBar} from "@angular/material";
import {Messages} from "../../../../../shared/constants/messages";

@Component({
    selector: 'task-form-component',
    template: `
        <div class="task-form">
            <form #form="ngForm" (ngSubmit)="save(task)">
                <mat-card>
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

                        <mat-form-field *ngIf="!updating" class="task-form__form-field">
                            <input matInput
                                   placeholder="Type"
                                   required
                                   readonly
                                   value="{{task.type ? task.type : ''}}">
                            <mat-hint align="start" *ngIf="type.valid || type.untouched">
                                {{hints.CHOOSE_TASK_TYPE}}
                            </mat-hint>
                            <mat-error align="start" *ngIf="type.invalid && type.touched">
                                {{errors.FIELD_IS_REQUIRED}}
                            </mat-error>
                        </mat-form-field>

                        <mat-radio-group required
                                         class="task-form__radio-button-group"
                                         name="taskType"
                                         #type="ngModel"
                                         [(ngModel)]="task.type">
                            <div *ngIf="!updating">
                                <mat-radio-button *ngFor="let type of taskTypes"
                                                  class="task-form__radio-button"
                                                  [value]="type"
                                >{{type}}</mat-radio-button>
                            </div>
                        </mat-radio-group>

                        <mat-form-field *ngIf="!updating" class="task-form__form-field">
                            <mat-label>Assignee</mat-label>
                            <mat-select name="assignee"
                                        required
                                        [(ngModel)]="task.assigneeId">
                                <mat-option *ngFor="let assignee of assignees"
                                            [value]="assignee.id">
                                    {{assignee.name}} {{assignee.surname}} {{assignee.patronymic}}
                                </mat-option>
                            </mat-select>
                            <mat-hint align="start" *ngIf="!task.assigneeId">
                                {{hints.CHOOSE_TASK_ASSIGNEE}}
                            </mat-hint>
                            <mat-error align="start">{{errors.FIELD_IS_REQUIRED}}</mat-error>
                        </mat-form-field>
                    </mat-card-content>
                    <mat-card-actions class="task-add-form__button-group">
                        <div class="task-add-form__reset-button-content">
                            <button type="button"
                                    mat-raised-button
                                    class="task-add-form__reset-button"
                                    color="warn"
                                    (click)="onReset()"
                            >Clear
                            </button>
                        </div>
                        <button type="button"
                                mat-stroked-button
                                class="task-add-form__cancel-button"
                                color="primary"
                                (click)="onCancel()"
                        >Cancel
                        </button>
                        <button type="submit"
                                mat-raised-button
                                class="task-add-form__save-button"
                                color="primary"
                                [disabled]="form.invalid || sending"
                        >Save
                        </button>

                    </mat-card-actions>
                    <mat-progress-bar *ngIf="sending" mode="indeterminate"></mat-progress-bar>
                </mat-card>
            </form>
        </div>
    `,
    styleUrls: [`./task-form.component.css`],
    providers: [EmployeeHttpService]
})

export class TaskFormComponent implements OnInit{
    private fieldLength = FieldLength;
    private taskTypes = TaskTypes;
    private errors = Errors;
    private hints = Hints;
    private messages = Messages;

    private assignees: Employee[];
    private manager: Manager = {} as Manager;
    private sending: boolean = false;

    @Input() private task: Task;
    @Input() private updating: boolean;

    @Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private taskDataService: TaskDataService,
        private tasksHttpService: TaskHttpService,
        private employeeService: EmployeeHttpService,
        private router: Router,
        private location: Location,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getEmployees();
    }

    save(task: Task) {
        this.sending = true;
        this.task.createdById = Number(localStorage.getItem("uid"));
        if (this.updating) {
            this.update(task);
        } else {
            this.add(task);
        }
    }

    add(task: Task) {
        this.tasksHttpService
            .add(task)
            .subscribe(() => {
                this.showMessage();
            });
    }

    showMessage() {
        this.sending = false;

        let snackBarRef = this.snackBar.open(
            this.messages.TASK_SAVED,
            'Close',
            {duration: 2000}
        );

        snackBarRef.afterDismissed()
            .subscribe();
        snackBarRef.onAction()
            .subscribe();

        this.closeForm();
        this.clearForm();
    }

    update(task: Task) {
        this.tasksHttpService
            .update(task)
            .subscribe(() => {
                this.showMessage();
            });
    }

    clearForm() {
        this.task = {} as Task;
    }

    onReset() {
        this.clearForm();
    }

    onCancel() {
        this.closeForm();
        this.clearForm();
    }

    closeForm() {
        this.expand.emit(false);
    }

    getEmployees() {
        this.manager.id = JSON.parse(localStorage.getItem('uid'));

        this.employeeService
            .getEmployeesByManagerId(this.manager)
            .subscribe(assignees => this.assignees = assignees);
    }
}
