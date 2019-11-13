import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";

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
                               [(ngModel)]="_manager.email">
                    </mat-form-field>

                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               placeholder="Password"
                               type="password"
                               name="password"
                               [(ngModel)]="_manager.password">
                    </mat-form-field>

                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               placeholder="Name"
                               name="name"
                               [(ngModel)]="_manager.name">
                    </mat-form-field>
                    
                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               placeholder="Surname"
                               name="surname"
                               [(ngModel)]="_manager.surname">
                    </mat-form-field>

                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               placeholder="Patronymic"
                               name="patronymic"
                               [(ngModel)]="_manager.patronymic">
                    </mat-form-field>
                    
                    <mat-form-field class="manager-form__form-field">
                        <input matInput
                               [matDatepicker]="picker"
                               placeholder="Choose a date"
                               name="birthDate"
                               [(ngModel)]="_manager.birthDate">
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
    private _manager: Manager = {} as Manager;
    private isUpdated: boolean = false;

    @Input()
    set manager(manager: Manager) {
        this._manager = manager || {} as Manager;
        manager ? this.isUpdated = true : this.isUpdated = false;
        console.log(this.isUpdated);
    }

    @Output() add: EventEmitter<Manager> = new EventEmitter();
    @Output() update: EventEmitter<Manager> = new EventEmitter();

    onSubmit() {
        if (this.isUpdated) {
            this.submitUpdate(this._manager);
        } else {
            this.submitAdd(this._manager);
        }
    }
    private submitAdd(manager: Manager) {
        this.isUpdated = false;
        this._manager = {} as Manager;
        this.add.emit(manager);
    }

    private submitUpdate(manager: Manager) {
        this.isUpdated = false;
        this._manager = {} as Manager;
        this.update.emit(manager)
    }
}
