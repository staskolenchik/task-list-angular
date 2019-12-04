import {Component, OnInit} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";
import {ManagerHttpService} from "../../manager-http.service";
import {Location} from "@angular/common";

@Component({
    selector: "manager-manager-component",
    template: `
        <div class="manager-profile-form">
            <form>
                <mat-card class="mat-elevation-z8">
                    <mat-card-title>Manager Info</mat-card-title>
                    <mat-card-content>
                        <mat-form-field class=" manager-profile-form__form-field">
                            <input matInput
                                   readonly
                                   type="email"
                                   placeholder="Email"
                                   name="email" 
                                   [(ngModel)]="manager.email"/>
                        </mat-form-field>

                        <mat-form-field class=" manager-profile-form__form-field">
                            <input matInput
                                   readonly
                                   placeholder="Name"
                                   name="name"
                                   [(ngModel)]="manager.name">
                        </mat-form-field>

                        <mat-form-field class=" manager-profile-form__form-field">
                            <input matInput
                                   readonly
                                   placeholder="Surname"
                                   name="surname"
                                   [(ngModel)]="manager.surname">
                        </mat-form-field>

                        <mat-form-field class=" manager-profile-form__form-field">
                            <input matInput
                                   readonly
                                   placeholder="Patronymic"
                                   name="patronymic"
                                   [(ngModel)]="manager.patronymic">
                        </mat-form-field>

                        <mat-form-field class=" manager-profile-form__form-field">
                            <input matInput
                                   readonly
                                   [matDatepicker]="picker"
                                   placeholder="Pick birthdate"
                                   name="birthDate"
                                   #birthDate="ngModel"
                                   [(ngModel)]="manager.birthDate">
                            <mat-datepicker-toggle matSuffix [for]="picker" hidden></mat-datepicker-toggle>
                            <mat-datepicker #picker></mat-datepicker>
                        </mat-form-field>
                    </mat-card-content>
                    <mat-card-actions class="manager-profile-form__button-group">
                        <button mat-stroked-button
                                class="manager-profile-form__back-button"
                                type="button"
                                color="primary"
                                (click)="back()"
                        >Back</button>
                    </mat-card-actions>
                </mat-card>
            </form>
        </div>
    `,
    styleUrls: [`./manager-profile.component.css`]
})

export class ManagerProfileComponent implements OnInit{
    private manager: Manager = {} as Manager;

    constructor(
        private managerHttpService: ManagerHttpService,
        private location: Location,
    ) {}

    ngOnInit(): void {
        const urlPaths = this.location.path().split('/');
        const id: string = urlPaths[urlPaths.length - 1];

        this.managerHttpService
            .findById(id)
            .subscribe((manager: Manager) => this.manager = manager);
    }

    back() {
        this.location.back();
    }
}
