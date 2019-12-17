import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Employee} from "../../../../shared/models/employee";
import {EmployeeHttpService} from "../../employee-http.service";
import {Manager} from "../../../../shared/models/manager";
import {ManagerHttpService} from "../../../managers/manager-http.service";

@Component({
    selector: 'employee-profile-component',
    template: `
        <div class="employee-profile-form">
            <form>
                <mat-card class="mat-elevation-z8">
                    <mat-card-title>Employee Info</mat-card-title>
                    <mat-card-content>
                        <mat-form-field class="employee-profile-form__form-field">
                            <input matInput
                                   readonly
                                   type="email"
                                   placeholder="Email"
                                   name="email"
                                   [ngModel]="employee.email"/>
                        </mat-form-field>

                        <mat-form-field class="employee-profile-form__form-field">
                            <input matInput
                                   readonly
                                   placeholder="Name"
                                   name="name"
                                   [ngModel]="employee.name">
                        </mat-form-field>

                        <mat-form-field class="employee-profile-form__form-field">
                            <input matInput
                                   readonly
                                   placeholder="Surname"
                                   name="surname"
                                   [ngModel]="employee.surname">
                        </mat-form-field>

                        <mat-form-field class="employee-profile-form__form-field" *ngIf="employee.patronymic != null">
                            <input matInput
                                   readonly
                                   placeholder="Patronymic"
                                   name="patronymic"
                                   [ngModel]="employee.patronymic">
                        </mat-form-field>

                        <mat-form-field class="employee-profile-form__form-field">
                            <input matInput
                                   readonly
                                   [matDatepicker]="picker"
                                   placeholder="Pick birthdate"
                                   name="birthDate"
                                   #birthDate="ngModel"
                                   [ngModel]="employee.birthDate">
                            <mat-datepicker-toggle matSuffix [for]="picker" hidden></mat-datepicker-toggle>
                            <mat-datepicker #picker></mat-datepicker>
                        </mat-form-field>

                        <mat-form-field class="employee-profile-form__form-field">
                            <input matInput
                                   readonly
                                   placeholder="Superior"
                                   name="name"
                                   [value]="manager.name + ' ' + manager.surname">
                        </mat-form-field>
                    </mat-card-content>
                    <mat-card-actions class="employee-profile-form__button-group">
                        <button mat-stroked-button
                                class="employee-profile-form__back-button"
                                type="button"
                                color="primary"
                                (click)="back()"
                        >Back</button>
                    </mat-card-actions>
                    <mat-progress-bar mode="indeterminate" *ngIf="sending"></mat-progress-bar>
                </mat-card>
            </form>
        </div>
    `,
    styleUrls: ['./employee-profile.component.css'],
    providers: [ManagerHttpService]
})
export class EmployeeProfileComponent implements OnInit{
    private employee: Employee = {} as Employee;
    private manager: Manager = {
        name: '',
        surname: '',
    } as Manager;

    private sending: boolean = false;

    constructor(
        private employeeHttpService: EmployeeHttpService,
        private managerHttpService: ManagerHttpService,
        private location: Location,
    ) {}

    ngOnInit(): void {
        this.sending = true;
        const urlPaths = this.location.path().split('/');
        const id: string = urlPaths[urlPaths.length - 1];

        this.employeeHttpService
            .findById(id)
            .subscribe(
                (employee: Employee) => {
                    this.employee = employee;
                    this.findManagerById(employee.superior.toString());
                },
                () => this.sending = false
            );
    }

    findManagerById(id: string) {
        this.managerHttpService
            .findById(id)
            .subscribe(
                (manager: Manager) => {
                    this.manager = manager;

                    this.sending = false;
                },
                () => this.sending = false
            );
    }

    back() {
        this.location.back();
    }
}
