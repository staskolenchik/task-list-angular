import {Component} from "@angular/core";

@Component({
    selector: 'task-manager-component',
    template: `
        <mat-accordion>
            <mat-expansion-panel [expanded]="isOpenedForm"
                                 (opened)="openForm()"
                                 (closed)="closeForm()">
                <mat-expansion-panel-header>
                    <mat-panel-description>{{isOpenedForm? 'click to close form' : 'click to open form'}}</mat-panel-description>
                </mat-expansion-panel-header>

                <task-form-component (expand)="closeFormByCancel($event)"></task-form-component>
            </mat-expansion-panel>
        </mat-accordion>

        <mat-tab-group >
            <div>
                <mat-tab label="All Tasks">
                    <all-task-list-table-component></all-task-list-table-component>
                </mat-tab>
                <mat-tab label="In Review Tasks">
                    <in-review-task-list-table-component></in-review-task-list-table-component>
                </mat-tab>
            </div>
        </mat-tab-group>
    `,
    styles: [`                
        /deep/.mat-tab-label, /deep/.mat-tab-label-active{
            min-width: 50%!important;
        }
    `]
})
export class TaskManagerComponent {
    private isOpenedForm: boolean = false;

    openForm() {
        this.isOpenedForm = true;
    }

    closeForm() {
        this.isOpenedForm = false;
    }

    closeFormByCancel(expand: boolean) {
        this.isOpenedForm = expand;
    }
}

