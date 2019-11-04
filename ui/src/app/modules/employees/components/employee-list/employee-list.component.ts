import {Component, Input} from "@angular/core";
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
                    </tr>
                    </thead>
                    <tr *ngFor="let employee of employees">
                        <td>{{employee.email}}</td>
                        <td>{{employee.name}} {{employee.surname}} {{employee.patronymic}}</td>
                        <td>{{employee.birthDate}}</td>
                    </tr>
                </table>
            </ng-template>
        </div>
    `,
    styles: [],
})

export class EmployeeListComponent {

    @Input() employees: Employee[];
}