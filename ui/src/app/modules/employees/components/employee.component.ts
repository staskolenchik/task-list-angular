import {Component, OnInit} from "@angular/core";
import {Employee} from "../../../shared/models/employee";
import {EmployeeService} from "../employee.service";

@Component({
    selector: 'employee-component',
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
    providers: [EmployeeService]
})

export class EmployeeComponent implements OnInit {

    private employees: Employee[] = [];

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit(): void {
        this.employeeService
            .getAll()
            .subscribe((data => this.employees = data));
    }

}