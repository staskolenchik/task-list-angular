import {Component} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";
import {ManagerHttpService} from "../../manager-http.service";
import {Location} from '@angular/common';
import {FieldLength} from "../../../../shared/constants/field-length";
import {Errors} from "../../../../shared/constants/errors";
import {Hints} from "../../../../shared/constants/hints";
import {Messages} from "../../../../shared/constants/messages";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ClearFormPermissionComponent} from "../../../../shared/modal-dialogs/clear-form/clear-form-permission.component";

@Component({
    selector: "manager-add-form-component",
    template: `
        <div class="manager-add-form">
            <form #form="ngForm" (ngSubmit)="save()">
                <mat-card class="mat-elevation-z8">
                    <mat-card-title>New Manager</mat-card-title>
                    <mat-card-content>
                        <mat-form-field class=" manager-add-form__form-field">
                            <input matInput
                                   type="email"
                                   placeholder="Email"
                                   autofocus
                                   required [maxLength]="fieldLength.USER_MAX_EMAIL" [pattern]="emailRegExp"
                                   name="email" [(ngModel)]="manager.email"
                                   #email="ngModel"/>
                            <button mat-button *ngIf="manager.email ? manager.email.length > 0 : false"
                                    matSuffix mat-icon-button
                                    aria-label="Clear"
                                    (click)="manager.email=''">
                                <mat-icon>close</mat-icon>
                            </button>
                            <mat-hint align="start" *ngIf="email.valid">
                                {{hints.MAX_LENGTH(fieldLength.USER_MAX_EMAIL)}}
                            </mat-hint>
                            <mat-hint align="end">
                                {{manager.email ? manager.email.length : 0}} / {{fieldLength.USER_MAX_EMAIL}}
                            </mat-hint>
                            <mat-error align="start"
                                       *ngIf="email.invalid && (email.dirty || email.touched)"
                            >{{errors.INVALID_EMAIL}}</mat-error>
                        </mat-form-field>

                        <mat-form-field class=" manager-add-form__form-field">
                            <input matInput
                                   type="password"
                                   placeholder="Password"
                                   required
                                   name="password"
                                   [(ngModel)]="manager.password"
                                   #password="ngModel"
                                   minlength="{{fieldLength.USER_MIN_PASSWORD}}"
                                   [maxLength]="fieldLength.USER_MAX_PASSWORD">
                            <button mat-button *ngIf="manager.password ? manager.password.length > 0 : false"
                                    matSuffix mat-icon-button
                                    aria-label="Clear"
                                    (click)="manager.password=''">
                                <mat-icon>close</mat-icon>
                            </button>
                            <mat-hint align="start" *ngIf="password.valid && (password.touched || password.dirty)">
                                {{hints.MAX_LENGTH(fieldLength.USER_MAX_PASSWORD)}}
                            </mat-hint>
                            <mat-hint align="end">
                                {{manager.password ? manager.password.length : 0}} / {{fieldLength.USER_MAX_PASSWORD}}
                            </mat-hint>
                            <mat-error *ngIf="password.invalid && (password.touched || password.dirty)">
                                {{errors.PASSWORD_MIN_LENGTH_REQUIRED}}
                            </mat-error>
                        </mat-form-field>

                        <mat-form-field class="manager-add-form__form-field">
                            <input matInput
                                   type="password"
                                   placeholder="Confirm password"
                                   required 
                                   [maxLength]="manager.password ? manager.password.length : 0" [pattern]="manager.password"
                                   name="confirmPassword"
                                   [(ngModel)]="manager.confirmPassword"
                                   #confirmPassword="ngModel">
                            <mat-hint class="manager-add-form__password-confirmed-hint" 
                                      *ngIf="confirmPassword.valid && password.valid" 
                                      align="start"
                            >{{hints.PASSWORD_CONFIRMED}}</mat-hint>
                            <mat-hint align="end">
                                {{manager.confirmPassword ? manager.confirmPassword.length : 0}} / {{manager.password ? manager.password.length : 0}}
                            </mat-hint>
                            <mat-error
                                    *ngIf="confirmPassword.invalid && (confirmPassword.touched || confirmPassword.dirty)">
                                {{errors.PASSWORDS_MISMATCH}}
                            </mat-error>
                        </mat-form-field>

                        <mat-form-field class=" manager-add-form__form-field">
                            <input matInput
                                   placeholder="Name"
                                   required
                                   name="name"
                                   [(ngModel)]="manager.name"
                                   #name="ngModel"
                                   [maxLength]="fieldLength.USER_MAX_NAME">
                            <button mat-button *ngIf="manager.name ? manager.name.length > 0 : false"
                                    matSuffix mat-icon-button
                                    aria-label="Clear"
                                    (click)="manager.name=''">
                                <mat-icon>close</mat-icon>
                            </button>
                            <mat-hint align="start" *ngIf="name.valid">
                                {{hints.MAX_LENGTH(fieldLength.USER_MAX_NAME)}}
                            </mat-hint>
                            <mat-hint align="end">
                                {{manager.name ? manager.name.length : 0}} / {{fieldLength.USER_MAX_NAME}}
                            </mat-hint>
                            <mat-error align="start"
                                       *ngIf="name.invalid && (name.dirty || name.touched)"
                            >{{errors.FIELD_IS_REQUIRED}}</mat-error>
                        </mat-form-field>

                        <mat-form-field class=" manager-add-form__form-field">
                            <input matInput
                                   placeholder="Surname"
                                   required
                                   name="surname"
                                   [(ngModel)]="manager.surname"
                                   #surname="ngModel"
                                   [maxLength]="fieldLength.USER_MAX_SURNAME">
                            <button mat-button *ngIf="manager.surname ? manager.surname.length > 0 : false"
                                    matSuffix mat-icon-button
                                    aria-label="Clear"
                                    (click)="manager.name=''">
                                <mat-icon>close</mat-icon>
                            </button>
                            <mat-hint align="start" *ngIf="surname.valid">
                                {{hints.MAX_LENGTH(fieldLength.USER_MAX_SURNAME)}}
                            </mat-hint>
                            <mat-hint align="end">
                                {{manager.surname ? manager.surname.length : 0}} / {{fieldLength.USER_MAX_SURNAME}}
                            </mat-hint>
                            <mat-error align="start"
                                       *ngIf="surname.invalid && (surname.dirty || surname.touched)"
                            >{{errors.FIELD_IS_REQUIRED}}</mat-error>
                        </mat-form-field>

                        <mat-form-field class=" manager-add-form__form-field">
                            <input matInput
                                   placeholder="Patronymic"
                                   name="patronymic"
                                   [(ngModel)]="manager.patronymic"
                                   #patronymic="ngModel"
                                   [maxLength]="fieldLength.USER_MAX_PATRONYMIC">
                            <button mat-button *ngIf="manager.patronymic ? manager.patronymic.length > 0 : false"
                                    matSuffix mat-icon-button
                                    aria-label="Clear"
                                    (click)="manager.name=''">
                                <mat-icon>close</mat-icon>
                            </button>
                            <mat-hint align="start"
                                      *ngIf="patronymic.valid && (patronymic.touched || patronymic.dirty)">
                                {{hints.MAX_LENGTH(fieldLength.USER_MAX_PATRONYMIC)}}
                            </mat-hint>
                            <mat-hint align="end">
                                {{manager.patronymic ? manager.patronymic.length : 0}}
                                / {{fieldLength.USER_MAX_PATRONYMIC}}
                            </mat-hint>
                        </mat-form-field>

                        <mat-form-field class=" manager-add-form__form-field">
                            <input matInput
                                   required
                                   [matDatepicker]="picker"
                                   placeholder="Pick birthdate"
                                   name="birthDate"
                                   #birthDate="ngModel"
                                   [(ngModel)]="manager.birthDate"
                                   [maxLength]="fieldLength.USER_MAX_BIRTHDATE"
                                   minlength="{{fieldLength.USER_MIN_BIRTHDATE}}">
                            <mat-datepicker-toggle matSuffix [for]="picker">
                            </mat-datepicker-toggle>
                            <mat-datepicker #picker></mat-datepicker>
                            <mat-hint align="start">
                                {{hints.BIRTHDATE_FORMAT}}
                            </mat-hint>
                            <mat-error align="start">
                                {{errors.BIRTHDATE_FORMAT_REQUIRED}}
                            </mat-error>
                        </mat-form-field>
                    </mat-card-content>
                    <mat-card-actions class="manager-add-form__button-group">
                        <div class="manager-add-form__reset-button-content">
                        <button mat-raised-button
                                class="manager-add-form__reset-button"
                                type="button"
                                color="warn"
                                (click)="askResetPermission()"
                        >Clear</button>
                        </div>
                        <button mat-stroked-button
                                class="manager-add-form__back-button"
                                type="button"
                                color="primary"
                                (click)="back()"
                        >Back</button>
                        <button mat-raised-button
                                class="manager-add-form__save-button"
                                [disabled]="form.invalid || sending || sent"
                                type="submit"
                                color="primary"
                        >Save</button>                        
                    </mat-card-actions>
                    <mat-progress-bar mode="indeterminate" *ngIf="sending"></mat-progress-bar>
                </mat-card>
            </form>
        </div>
    `,
    styleUrls: ['./manager-add-form.component.css']
})

export class ManagerAddFormComponent {
    private fieldLength = FieldLength;
    private errors = Errors;
    private hints = Hints;
    private messages = Messages;

    private emailRegExp: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    private sending: boolean = false;
    private sent: boolean = false;

    private manager: Manager = {} as Manager;

    constructor(
        private managerService: ManagerHttpService,
        private location: Location,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    save() {
        this.sending = true;
        this.managerService
            .add(this.manager)
            .subscribe(
                () => {
                    this.manager = {} as Manager;
                    this.sent = true;
                    this.sending = false;

                    this.showMessage();
                },
                () => {
                    this.sending = false;
                });
    }

    showMessage() {
        let snackBarRef = this.snackBar.open(
            this.messages.MANAGER_SAVED,
            'Close',
            {duration: 2000}
        );

        snackBarRef.afterDismissed()
            .subscribe(() => {
                this.back();
            });
        snackBarRef.onAction()
            .subscribe(() => {
                this.back();
            });
    }

    back() {
        this.location.back();
    }

    reset() {
        this.manager = {} as Manager;
    }

    askResetPermission(): void {
        const matDialogRef = this.dialog.open(ClearFormPermissionComponent, {
            height: '210px',
            width: '480px',
        });

        matDialogRef.afterClosed().subscribe(isApproved => {
            if (isApproved) {
                this.reset();
            }
        })
    }
}
