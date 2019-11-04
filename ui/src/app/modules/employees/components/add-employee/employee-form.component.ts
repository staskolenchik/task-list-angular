import {Component, EventEmitter, Output} from "@angular/core";
import {Employee} from "../../../../shared/models/employee";

@Component({
    selector: 'employee-form-component',
    template: `        
        <form class="employee-form" (ngSubmit)="onSubmit()" novalidate>
            <div>
                <label for="employee-email">Email: </label>
                <input id="employee-email"
                       type="text"
                       name="email"
                       [(ngModel)]="employee.email">
            </div>
            <div>
                <label for="employee-password">Password: </label>
                <input id="employee-password"
                       type="password"
                       name="password"
                       [(ngModel)]="employee.password">
            </div>
            <div>
                <label>First Name: </label>
                <input type="text" 
                       name="name" 
                       [(ngModel)]="employee.name">
            </div>
            <div>
                <label>Surname: </label>
                <input type="text" 
                       name="surname" 
                       [(ngModel)]="employee.surname">
            </div>
            <div>
                <label>Patronymic: </label>
                <input type="text"
                       name="patronymic" 
                       [(ngModel)]="employee.patronymic">
            </div>
            <div>
                <label>Birth Date: </label>
                <input type="text" 
                       name="birthDate" 
                       [(ngModel)]="employee.birthDate">
            </div>
            <div>
                <label>Manager: Vasia Beliy</label>
            </div>
            <br>
            <button>Submit</button>
        </form>
    `,
    styles: []
})

export class EmployeeFormComponent {
    private employee: Employee = {} as Employee;

    @Output() add: EventEmitter<Employee> = new EventEmitter();

    onSubmit() {
        this.employee.managerId = 1;
        this.add.emit(this.employee);
        this.employee = {} as Employee;
    }
}