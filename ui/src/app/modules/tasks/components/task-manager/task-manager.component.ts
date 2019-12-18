import {Component} from "@angular/core";
import {Task} from "../../../../shared/models/task";
import {EmployeeHttpService} from "../../../employees/employee-http.service";

@Component({
    selector: 'task-manager-component',
    template: `
        <mat-accordion>
            <mat-expansion-panel [expanded]="openingForm"
                                 (opened)="openPanel()"
                                 (closed)="closePanel()">
                <mat-expansion-panel-header>
                    <mat-panel-title>Fill Task Form</mat-panel-title>
                    <mat-panel-description>{{openingForm ? 'Click to Close' : 'Click to Open'}}</mat-panel-description>
                </mat-expansion-panel-header>

                <task-form-component (expand)="closePanelFromForm($event)"
                                     (notifySaved)="notifySaved($event)"
                                     [task]="task"
                                     [updating]="updating">
                </task-form-component>
            </mat-expansion-panel>
        </mat-accordion>

        <mat-tab-group>
            <mat-tab label="All Tasks">
                <all-task-list-table-component
                        [notifyUpdating]="notifyUpdating"
                        (notifyUpdated)="notifySaved($event)"
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
    private openingForm: boolean = false;
    private updating: boolean = false;
    private showingInfo: boolean = false;
    private task: Task = {} as Task;
    private taskInfo: Task = {} as Task;
    private notifyUpdating: boolean = false;

    openPanel() {
        this.openingForm = true;
    }

    closePanel() {
        this.updating = false;
        this.openingForm = false;
    }

    closePanelFromForm(expand: boolean) {
        this.updating = false;
        this.openingForm = expand;
    }

    transferUpdate(task: Task) {
        this.updating = true;
        this.openingForm = true;
        this.task = task;
    }

    transferShow(task: Task) {
        this.showingInfo = true;
        this.taskInfo = task;
    }

    showInfo(showingInfo: boolean) {
        this.showingInfo = showingInfo;
    }

    notifySaved(value: boolean) {
        this.notifyUpdating = value;
    }
}

