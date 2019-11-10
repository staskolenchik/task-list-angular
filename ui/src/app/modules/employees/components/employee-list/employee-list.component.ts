import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Employee} from "../../../../shared/models/employee";

@Component({
    selector: 'employee-list-component',
    template: `
        <div>
            <div *ngIf="employees.length === 0; else showEmployees">Loading...</div>
            <ng-template #showEmployees>
                <table>
                    <thead>
                    <tr>
                        <td>Email</td>
                        <td>Full name</td>
                        <td>Birth date</td>
                        <td>Options</td>
                    </tr>
                    </thead>
                    <tr *ngFor="let employee of employees">
                        <td>{{employee.email}}</td>
                        <td>{{employee.name}} {{employee.surname}} {{employee.patronymic}}</td>
                        <td>{{employee.birthDate}}</td>
                        <td>
                            <button>Update</button>
                            <button (click)="onDelete(employee)">Delete</button>
                        </td>
                    </tr>
                </table>
            </ng-template>
        </div>
    `,
    styles: [],
})

export class EmployeeListComponent {

    @Input() employees: Employee[];

    @Output() delete: EventEmitter<Employee> = new EventEmitter();

    onDelete(employee: Employee) {
        this.delete.emit(employee);
    }
}
