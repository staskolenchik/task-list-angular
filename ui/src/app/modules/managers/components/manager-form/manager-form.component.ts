import {Component} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";
import {ManagerService} from "../../manager.service";

@Component({
    selector: "manager-form-component",
    template: `
        <mat-card class="mat-elevation-z8">
            <mat-card-title>Manager Form</mat-card-title>
            <mat-card-content>
                <form class="manager-form">
                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               placeholder="Email"
                               autofocus
                               name="email"
                               [(ngModel)]="manager.email">
                    </mat-form-field>

                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               placeholder="Password"
                               type="password"
                               name="password"
                               [(ngModel)]="manager.password">
                    </mat-form-field>

                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               placeholder="Name"
                               name="name"
                               [(ngModel)]="manager.name">
                    </mat-form-field>
                    
                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               placeholder="Surname"
                               name="surname"
                               [(ngModel)]="manager.surname">
                    </mat-form-field>

                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               placeholder="Patronymic"
                               name="patronymic"
                               [(ngModel)]="manager.patronymic">
                    </mat-form-field>
                    
                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               [matDatepicker]="picker"
                               placeholder="Choose a date"
                               name="birthDate"
                               [(ngModel)]="manager.birthDate">
                        <mat-datepicker-toggle matSuffix [for]="picker">
                        </mat-datepicker-toggle>
                        <mat-datepicker #picker></mat-datepicker>
                    </mat-form-field>
                </form>
            </mat-card-content>
            <mat-card-actions>
                <button mat-raised-button 
                        color="primary" 
                        (click)="onSubmit()"
                >Save</button>
                <button mat-raised-button 
                        color="warn"
                >Cancel</button>
            </mat-card-actions>
        </mat-card>
    `,
    styles: [`
        .manager-form__form-field {
            display: block;
            width: 100%;
        }
    `]
})

export class ManagerFormComponent {
    private manager: Manager = {} as Manager;

    constructor(private managerService: ManagerService) {}

    onSubmit() {
        this.manager = {} as Manager;
        this.managerService.add(this.manager).subscribe();
    }
}
