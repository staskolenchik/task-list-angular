import {AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output} from "@angular/core";
import {Task} from "../../../../shared/models/task";

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
                    <button mat-stroked-button
                            color="primary"
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
export class TaskInfoComponent implements AfterViewChecked{

    private task: Task;

    @Input() set taskInfo(task: Task) {
        this.task = task;
    }

    @Output() showInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private cdRef: ChangeDetectorRef) {}

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
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
        this.setEmptyTask();
        this.showInfo.emit(false);
    }
}
