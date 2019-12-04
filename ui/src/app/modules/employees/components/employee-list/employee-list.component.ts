import {Component} from "@angular/core";
import {Employee} from "../../../../shared/models/employee";

@Component({
    selector: 'employee-list-component',
    template: `
        <div>
            <a routerLink="form">Create Employee</a>
            
            <div #showEmployees>
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
                            <button (click)="onUpdate(employee)">Update</button>
                            <button (click)="onDelete(employee)">Delete</button>
                            <a routerLink="profile/{{employee.id}}">info</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `,
    styles: [],
})

export class EmployeeListComponent {

    private employees: Employee[];



    onDelete(employee: Employee) {

    }

    onUpdate(employee: Employee) {

    }
}
