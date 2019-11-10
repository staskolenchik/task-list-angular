import {Component, EventEmitter, Input, Output} from "@angular/core";
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
                       [(ngModel)]="_employee.email">
            </div>
            <div>
                <label for="employee-password">Password: </label>
                <input id="employee-password"
                       type="password"
                       name="password"
                       [(ngModel)]="_employee.password">
            </div>
            <div>
                <label>First Name: </label>
                <input type="text" 
                       name="name" 
                       [(ngModel)]="_employee.name">
            </div>
            <div>
                <label>Surname: </label>
                <input type="text" 
                       name="surname" 
                       [(ngModel)]="_employee.surname">
            </div>
            <div>
                <label>Patronymic: </label>
                <input type="text"
                       name="patronymic" 
                       [(ngModel)]="_employee.patronymic">
            </div>
            <div>
                <label>Birth Date: </label>
                <input type="text" 
                       name="birthDate" 
                       [(ngModel)]="_employee.birthDate">
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
    private _employee: Employee = {} as Employee;

    @Output() add: EventEmitter<Employee> = new EventEmitter();
    @Output() update: EventEmitter<Employee> = new EventEmitter();

    @Input()
    set employee(employee: Employee) {
        this._employee = employee ? employee : {} as Employee;
    }

    onSubmit() {
        if (this._employee.id) {
            this.update.emit(this._employee);
        } else {
            this._employee.managerId = 1;
            this.add.emit(this._employee);
        }
        this._employee = {} as Employee;
    }
}
