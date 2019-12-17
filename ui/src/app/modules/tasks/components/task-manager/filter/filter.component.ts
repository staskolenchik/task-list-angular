import {Component, EventEmitter, Output} from '@angular/core';
import {Employee} from "../../../../../shared/models/employee";
import {TaskStatus} from "../../../../../shared/models/task-status";

@Component({
    selector: 'filter-component',
    template: `
        <assignee-filter-component (employees)="transferEmployees($event)"
        ></assignee-filter-component>


        <date-filter-component [labelName]="dateFromLabelName"
                               (data)="transferDateFrom($event)"
        ></date-filter-component>

        <date-filter-component [labelName]="dateToLabelName"
                               (data)="transferDateTo($event)"
        ></date-filter-component>


        <status-filter-component (statuses)="transferStatuses($event)"
        ></status-filter-component>
    `,
})
export class FilterComponent  {
    @Output() employees: EventEmitter<Employee[]> = new EventEmitter();
    @Output() dateFrom: EventEmitter<Date> = new EventEmitter();
    @Output() dateTo: EventEmitter<Date> = new EventEmitter();
    @Output() statuses: EventEmitter<TaskStatus[]> = new EventEmitter();

    private dateFromLabelName: string = 'Date from 00:00:00';
    private dateToLabelName: string = 'Date until 23:59:59';

    transferEmployees(employees: Employee[]) {
        this.employees.emit(employees);
    }

    transferStatuses(statuses: TaskStatus[]) {
        this.statuses.emit(statuses);
    }

    transferDateFrom(dateFrom: Date) {
        this.dateFrom.emit(dateFrom);
    }

    transferDateTo(dateTo: Date) {
        const dayEnd: Date = new Date(dateTo.getTime() + 8639999);
        this.dateTo.emit(dayEnd);
    }
}
