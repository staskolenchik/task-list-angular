import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Task} from "../../../../shared/models/task";
import {TaskType} from "../../../../shared/models/task-type";
import {Employee} from "../../../../shared/models/employee";

@Component({
    selector: 'task-form-component',
    template: `
        <mat-card class="mat-elevation-z8">
            <mat-card-title>Task Form</mat-card-title>
            <mat-card-content>
                <form class="task-form">
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
                        (click)="onSubmit()"
                >Save
                </button>
                <button mat-raised-button
                        color="warn"
                >Cancel
                </button>
            </mat-card-actions>
        </mat-card>
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
    `]
})

export class TaskFormComponent {
    private taskTypes: TaskType[] = [TaskType.STORY, TaskType.ISSUE];

    @Input() private assignees: Employee[];
    @Input() private task: Task;
    @Input() private updatable: boolean;

    @Output() add: EventEmitter<Task> = new EventEmitter();

    onSubmit() {
        this.task.createdById = 2;
        this.add.emit(this.task);
    }
}
