import {Component, OnInit} from "@angular/core";
import {Employee} from "../../../shared/models/employee";
import {EmployeeService} from "../employee.service";
import {ManagerHttpService} from "../../managers/manager-http.service";
import {Manager} from "../../../shared/models/manager";


@Component({
    selector: 'employee-component',
    template: `
        <employee-form-component (add)="add($event)" 
                                 [employee]="employee" 
                                 (update)="update($event)" 
                                 [managers]="managers">
        </employee-form-component>
        <employee-list-component [employees]="employees" (delete)="delete($event)" (update)="updateForm($event)"></employee-list-component>
    `,
    styles: [],
    providers:[EmployeeService, ManagerHttpService]
})

export class EmployeeComponent implements OnInit{

    private employees: Employee[] = [];
    private employee: Employee;
    private managers: Manager[] = [];

    constructor(
        private employeeService: EmployeeService,
        private managerService: ManagerHttpService
    ) {}

    ngOnInit(): void {
        this.getAll();
        this.getAllManagers();
    }

    getAll() {
        this.employeeService
            .getAll()
            .subscribe((data => this.employees = data));
    }

    add(employee: Employee) {
        this.employeeService
            .add(employee)
            .subscribe(newEmployee => {
                this.employees.push(newEmployee);

                this.employee = {} as Employee;
        })
    }

    updateForm(employee: Employee) {
        this.employee = employee;
    }

    update(employee: Employee) {
        this.employeeService
            .update(employee)
            .subscribe(updatedEmployee => {
                let index = this.employees.indexOf(employee);
                this.employees.splice(index, 1, updatedEmployee);

                this.employee = {} as Employee;
            })
    }

    delete(employee: Employee) {
        this.employeeService.delete(employee).subscribe(() => {
            let index = this.employees.indexOf(employee);
            this.employees.splice(index, 1);
        });
    }

    getAllManagers() {
        this.managerService.getAll()
            .subscribe(managers => this.managers = managers);
    }
}
