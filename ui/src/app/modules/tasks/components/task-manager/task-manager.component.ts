import {Component} from "@angular/core";
import {Task} from "../../../../shared/models/task";
import {EmployeeHttpService} from "../../../employees/employee-http.service";

@Component({
    selector: 'task-manager-component',
    template: `
        <mat-accordion>
            <mat-expansion-panel [expanded]="isOpenedForm"
                                 (opened)="openForm()"
                                 (closed)="closeForm()">
                <mat-expansion-panel-header>
                    <mat-panel-title>Fill Task Form</mat-panel-title>
                    <mat-panel-description>{{isOpenedForm ? 'Click to Close' : 'Click to Open'}}</mat-panel-description>
                </mat-expansion-panel-header>

                <task-form-component (expand)="closeFormByCancel($event)"
                                     [task]="task"
                                     [updatable]="updating">
                </task-form-component>
            </mat-expansion-panel>
        </mat-accordion>

        <mat-tab-group>
            <mat-tab label="All Tasks">
                <all-task-list-table-component
                        (transferUpdate)="transferUpdate($event)"
                        (transferShow)="transferShow($event)">
                </all-task-list-table-component>
            </mat-tab>
            <mat-tab label="In Review Tasks">
                <in-review-task-list-table-component
                        (transferUpdate)="transferUpdate($event)"
                        (transferShow)="transferShow($event)">
                </in-review-task-list-table-component>
            </mat-tab>
        </mat-tab-group>

        <div *ngIf="showingInfo">
            <task-info-component [taskInfo]="taskInfo" (showInfo)="showInfo($event)"></task-info-component>
        </div>
    `,
    styleUrls: ['./task-manager.component.css'],
    providers: [EmployeeHttpService]
})
export class TaskManagerComponent {
    private isOpenedForm: boolean = false;
    private updating: boolean = false;
    private showingInfo: boolean = false;
    private task: Task = {} as Task;
    private taskInfo: Task = {} as Task;

    openForm() {
        this.isOpenedForm = true;
    }

    closeForm() {
        this.updating = false;
        this.isOpenedForm = false;
    }

    closeFormByCancel(expand: boolean) {
        this.updating = false;
        this.isOpenedForm = expand;
    }

    transferUpdate(task: Task) {
        this.updating = true;
        this.isOpenedForm = true;
        this.task = task;
    }

    transferShow(task: Task) {
        this.showingInfo = true;
        this.taskInfo = task;
    }

    showInfo(showingInfo: boolean) {
        this.showingInfo = showingInfo;
    }
}

