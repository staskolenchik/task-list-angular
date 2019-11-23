import {Component, OnInit} from "@angular/core";
import {Location} from '@angular/common';
import {TaskDataService} from "../../task-data.service";
import {Task} from "../../../../shared/models/task";

import {ChangeDetectorRef} from '@angular/core';

@Component({
    selector: 'task-info-component',
    template: `
        <div class="task-form">
            <mat-card class="mat-elevation-z8">
                <mat-card-title>Task Info</mat-card-title>
                <mat-card-content>
                    <form>
                        <mat-form-field class="task-form__form-field">
                            <input matInput
                                   placeholder="Subject"
                                   name="subject"
                                   readonly
                                   [value]="task.subject"/>
                        </mat-form-field>

                        <mat-form-field class="task-form__form-field">
                            <textarea matInput
                                      placeholder="Description"
                                      name="description"
                                      readonly
                                      [textContent]="task.description"></textarea>
                        </mat-form-field>

                        <mat-form-field class="task-form__form-field">
                            <input matInput placeholder="Created At"
                                   readonly
                                   [value]="task.creationDateTime">
                        </mat-form-field>

                        <mat-form-field class="task-form__form-field">
                            <input matInput placeholder="Assignee"
                                   readonly
                                   [value]="task.assigneeName + ' ' + task.assigneeSurname">
                        </mat-form-field>
                    </form>
                </mat-card-content>
                <mat-card-actions>
                    <button mat-raised-button
                            (click)="goBack()"
                    >Cancel</button>
                </mat-card-actions>
            </mat-card>
        </div>
    `,
    styles: [`
        .task-form__form-field{
            display: block;
        }
        .task-form {
            padding: 30px;
        }
    `]
})
export class TaskInfoComponent implements OnInit{

    private task: Task;

    constructor(
        private taskDataService: TaskDataService,
        private location: Location,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getTask();
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    getTask() {
        this.taskDataService.getTask()
            .subscribe(task => {
            if (task.id) {
                this.task = task;
            } else {
                this.setEmptyTask();
            }
        });
    }

    setEmptyTask() {
        this.task = {
            subject: '',
            description: '',
            creationDateTime: '',
            assigneeName: '',
            assigneeSurname: ''
        } as Task;
    }

    goBack() {
        this.taskDataService.setTask({} as Task);
        this.location.back();
    }
}
