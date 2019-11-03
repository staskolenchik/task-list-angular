import {Component, OnInit} from "@angular/core";
import {Employee} from "../../../shared/models/employee";
import {EmployeeService} from "../employee.service";


@Component({
    selector: 'employee-component',
    template: `
        <employee-form-component (add)="add($event)"></employee-form-component>
        <employee-list-component [employees]="employees"></employee-list-component>
    `,
    styles: [],
    providers:[EmployeeService]
})

export class EmployeeComponent implements OnInit{

    private employees: Employee[] = [];

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit(): void {
        this.employeeService
            .getAll()
            .subscribe((data => this.employees = data));
    }

    add(employee: Employee) {
        this.employeeService.add(employee).subscribe(newEmployee => {
            this.employees.push(newEmployee);
        })
    }
}