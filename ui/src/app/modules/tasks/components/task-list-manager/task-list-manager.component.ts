import {Component} from "@angular/core";

@Component({
    selector: 'task-list-manager-component',
    template: `        
        
            <mat-accordion>
                <mat-expansion-panel [expanded]="opening">
                    <mat-expansion-panel-header>
                        <mat-panel-title>New Task Form</mat-panel-title>
                        <mat-panel-description>Click to fill form</mat-panel-description>
                    </mat-expansion-panel-header>
                    
                    <task-form-component></task-form-component>
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
export class TaskListManagerComponent {
    private opening: boolean = false;
}

