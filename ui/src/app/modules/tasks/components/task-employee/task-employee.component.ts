import {Task} from "../../../../shared/models/task";
import {Component} from "@angular/core";

@Component({
    selector: 'task-employee-component',
    template: `
        <div class="new-task-list-employee-table">
            <todo-inprogress-task-list-table-component (transferShow)="transferShow($event)">
            </todo-inprogress-task-list-table-component>
        </div>

        <div *ngIf="showable">
            <task-info-component [taskInfo]="taskInfo" (showInfo)="showInfo($event)"></task-info-component>
        </div>
    `,
    styles: [`
        .new-task-list-employee-table {
            padding: 30px;
        }
    `]

})
export class TaskEmployeeComponent {

    private taskInfo: Task = {} as Task;
    private showable: boolean = false;

    constructor() {}

    transferShow(task: Task): void {
        this.taskInfo = task;
        this.showable = true;
    }

    showInfo(showable: boolean) {
        this.showable = showable;
    }
}
