import {Component, EventEmitter, Output} from '@angular/core';
import {Employee} from "../../../../../shared/models/employee";
import {TaskStatus} from "../../../../../shared/models/task-status";
import {MatDatepickerInputEvent} from "@angular/material";

@Component({
    selector: 'filter-component',
    template: `        
        <assignee-filter-component (employees)="transferEmployees($event)"></assignee-filter-component>
        
        <div class="form-field-date">
            <mat-form-field appearance="outline" class="form-field-date__from">
                <mat-label>Date from</mat-label>
                <input matInput [matDatepicker]="fromPicker" placeholder="dd/mm/yyyy" (dateChange)="transferDateFrom($event)">
                <mat-datepicker-toggle matSuffix [for]="fromPicker"></mat-datepicker-toggle>
                <mat-datepicker #fromPicker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field-date__from">
                <mat-label>Date to</mat-label>
                <input matInput [matDatepicker]="toPicker" placeholder="dd/mm/yyyy" (dateChange)="transferDateTo($event)">
                <mat-datepicker-toggle matSuffix [for]="toPicker"></mat-datepicker-toggle>
                <mat-datepicker #toPicker></mat-datepicker>
            </mat-form-field>
        </div>
        
        <status-filter-component class="form-field-task-status"
                                 (statuses)="transferStatuses($event)"
        ></status-filter-component>
    `,
    styles: [`
        .form-field-assignee,
        .form-field-task-status {
            display: block;
            width: 100%;
        }
        
        .form-field-date {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        
        .form-field-date__from,
        .form-field-date__to {
            width: 48%;
        }
    `]
})
export class FilterComponent  {
    @Output() employees: EventEmitter<Employee[]> = new EventEmitter();
    @Output() dateFrom: EventEmitter<any> = new EventEmitter();
    @Output() dateTo: EventEmitter<any> = new EventEmitter();
    @Output() statuses: EventEmitter<TaskStatus[]> = new EventEmitter();

    transferEmployees(employees: Employee[]) {
        this.employees.emit(employees);
    }

    transferStatuses(statuses: TaskStatus[]) {
        this.statuses.emit(statuses);
    }

    transferDateFrom(event: MatDatepickerInputEvent<any>) {
        this.dateFrom.emit(event.value);
    }

    transferDateTo(event: MatDatepickerInputEvent<any>) {
        this.dateTo.emit(event.value);
    }
}
