import {Component} from "@angular/core";
import {Task} from "../../../../shared/models/task";

@Component({
    selector: 'task-manager-component',
    template: `
        <mat-accordion>
            <mat-expansion-panel [expanded]="isOpenedForm"
                                 (opened)="openForm()"
                                 (closed)="closeForm()">
                <mat-expansion-panel-header>
                    <mat-panel-description>{{isOpenedForm ? 'click to close form' : 'click to open form'}}</mat-panel-description>
                </mat-expansion-panel-header>

                <task-form-component (expand)="closeFormByCancel($event)"
                                     [task]="task"
                                     [updatable]="updatable">
                </task-form-component>
            </mat-expansion-panel>
        </mat-accordion>

        <mat-tab-group>
            <div>
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
            </div>
        </mat-tab-group>

        <div *ngIf="showable">
            <task-info-component [taskInfo]="taskInfo" (showInfo)="showInfo($event)"></task-info-component>
        </div>

    `,
    styles: [`                
        /deep/.mat-tab-label, /deep/.mat-tab-label-active{
            min-width: 50%!important;
        }
    `]
})
export class TaskManagerComponent {
    private isOpenedForm: boolean = false;
    private updatable: boolean = false;
    private showable: boolean = false;
    private task: Task = {} as Task;
    private taskInfo: Task = {} as Task;

    openForm() {
        this.isOpenedForm = true;
    }

    closeForm() {
        this.updatable = false;
        this.isOpenedForm = false;
    }

    closeFormByCancel(expand: boolean) {
        this.updatable = false;
        this.isOpenedForm = expand;
    }

    transferUpdate(task: Task) {
        this.updatable = true;
        this.isOpenedForm = true;
        this.task = task;
    }

    transferShow(task: Task) {
        this.showable = true;
        this.taskInfo = task;
    }

    showInfo(showable: boolean) {
        this.showable = showable;
    }
}

