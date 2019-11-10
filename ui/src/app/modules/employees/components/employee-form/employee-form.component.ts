import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Employee} from "../../../../shared/models/employee";
import {Manager} from "../../../../shared/models/manager";

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
                <label>Manager select: </label>
                <select name="managerId" [(ngModel)]="_employee.managerId">
                    <option name="manager" *ngFor="let manager of _managers" [value]="manager.id">
                        {{manager.name}} {{manager.surname}} {{manager.patronymic}}
                    </option>
                </select>
            </div>
            <br>
            <button>Submit</button>
        </form>
    `,
    styles: []
})

export class EmployeeFormComponent {
    private _employee: Employee = {} as Employee;
    private _managers: Manager[] = [];

    @Output() add: EventEmitter<Employee> = new EventEmitter();
    @Output() update: EventEmitter<Employee> = new EventEmitter();

    @Input()
    set employee(employee: Employee) {
        this._employee = employee ? employee : {} as Employee;
    }

    @Input()
    set managers(managers: Manager[]) {
        this._managers = managers;
    }

    onSubmit() {
        if (this._employee.id) {
            this.update.emit(this._employee);
        } else {
            this.add.emit(this._employee);
        }
    }
}
