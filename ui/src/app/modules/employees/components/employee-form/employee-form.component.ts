import {Component} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";
import {FieldLength} from "../../../../shared/constants/field-length";
import {Errors} from "../../../../shared/constants/errors";
import {Hints} from "../../../../shared/constants/hints";
import {Messages} from "../../../../shared/constants/messages";
import {Location} from "@angular/common";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ClearFormPermissionComponent} from "../../../../shared/modal-dialogs/clear-form/clear-form-permission.component";
import {Employee} from "../../../../shared/models/employee";
import {EmployeeHttpService} from "../../employee-http.service";

@Component({
    selector: 'employee-form-component',
    template: `
        <div class="employee-add-form">
            <form #form="ngForm" (ngSubmit)="save()">
                <mat-card class="mat-elevation-z8">
                    <div *ngIf="!selecting; else SelectManager">
                        <mat-card-title>New Employee</mat-card-title>
                        <mat-card-content>
                            <mat-form-field class="employee-add-form__form-field">
                                <input matInput
                                       type="email"
                                       placeholder="Email"
                                       autofocus
                                       required [maxLength]="fieldLength.USER_MAX_EMAIL" [pattern]="emailRegExp"
                                       name="email" [(ngModel)]="employee.email"
                                       #email="ngModel"/>
                                <button mat-button *ngIf="employee.email ? employee.email.length > 0 : false"
                                        matSuffix mat-icon-button
                                        aria-label="Clear"
                                        (click)="employee.email=''">
                                    <mat-icon>close</mat-icon>
                                </button>
                                <mat-hint align="start" *ngIf="email.valid">
                                    {{hints.MAX_LENGTH(fieldLength.USER_MAX_EMAIL)}}
                                </mat-hint>
                                <mat-hint align="end">
                                    {{employee.email ? employee.email.length : 0}} / {{fieldLength.USER_MAX_EMAIL}}
                                </mat-hint>
                                <mat-error align="start"
                                           *ngIf="email.invalid && (email.dirty || email.touched)"
                                >{{errors.INVALID_EMAIL}}</mat-error>
                            </mat-form-field>

                            <mat-form-field class="employee-add-form__form-field">
                                <input matInput
                                       type="password"
                                       placeholder="Password"
                                       required
                                       name="password"
                                       [(ngModel)]="employee.password"
                                       #password="ngModel"
                                       minlength="{{fieldLength.USER_MIN_PASSWORD}}"
                                       [maxLength]="fieldLength.USER_MAX_PASSWORD">
                                <button mat-button *ngIf="employee.password ? employee.password.length > 0 : false"
                                        matSuffix mat-icon-button
                                        aria-label="Clear"
                                        (click)="employee.password=''">
                                    <mat-icon>close</mat-icon>
                                </button>
                                <mat-hint align="start" *ngIf="password.valid && (password.touched || password.dirty)">
                                    {{hints.MAX_LENGTH(fieldLength.USER_MAX_PASSWORD)}}
                                </mat-hint>
                                <mat-hint align="end">
                                    {{employee.password ? employee.password.length : 0}} / {{fieldLength.USER_MAX_PASSWORD}}
                                </mat-hint>
                                <mat-error *ngIf="password.invalid && (password.touched || password.dirty)">
                                    {{errors.PASSWORD_MIN_LENGTH_REQUIRED}}
                                </mat-error>
                            </mat-form-field>

                            <mat-form-field class="employee-add-form__form-field">
                                <input matInput
                                       type="password"
                                       placeholder="Confirm password"
                                       required
                                       [maxLength]="employee.password ? employee.password.length : 0" [pattern]="employee.password"
                                       name="confirmPassword"
                                       [(ngModel)]="employee.confirmPassword"
                                       #confirmPassword="ngModel">
                                <mat-hint class="manager-add-form__password-confirmed-hint"
                                          *ngIf="confirmPassword.valid && password.valid"
                                          align="start"
                                >{{hints.PASSWORD_CONFIRMED}}</mat-hint>
                                <mat-hint align="end">
                                    {{employee.confirmPassword ? employee.confirmPassword.length : 0}} / {{employee.password ? employee.password.length : 0}}
                                </mat-hint>
                                <mat-error
                                        *ngIf="confirmPassword.invalid && (confirmPassword.touched || confirmPassword.dirty)">
                                    {{errors.PASSWORDS_MISMATCH}}
                                </mat-error>
                            </mat-form-field>

                            <mat-form-field class="employee-add-form__form-field">
                                <input matInput
                                       placeholder="Name"
                                       required
                                       name="name"
                                       [(ngModel)]="employee.name"
                                       #name="ngModel"
                                       [maxLength]="fieldLength.USER_MAX_NAME">
                                <button mat-button *ngIf="employee.name ? employee.name.length > 0 : false"
                                        matSuffix mat-icon-button
                                        aria-label="Clear"
                                        (click)="employee.name=''">
                                    <mat-icon>close</mat-icon>
                                </button>
                                <mat-hint align="start" *ngIf="name.valid">
                                    {{hints.MAX_LENGTH(fieldLength.USER_MAX_NAME)}}
                                </mat-hint>
                                <mat-hint align="end">
                                    {{employee.name ? employee.name.length : 0}} / {{fieldLength.USER_MAX_NAME}}
                                </mat-hint>
                                <mat-error align="start"
                                           *ngIf="name.invalid && (name.dirty || name.touched)"
                                >{{errors.FIELD_IS_REQUIRED}}</mat-error>
                            </mat-form-field>

                            <mat-form-field class="employee-add-form__form-field">
                                <input matInput
                                       placeholder="Surname"
                                       required
                                       name="surname"
                                       [(ngModel)]="employee.surname"
                                       #surname="ngModel"
                                       [maxLength]="fieldLength.USER_MAX_SURNAME">
                                <button mat-button *ngIf="employee.surname ? employee.surname.length > 0 : false"
                                        matSuffix mat-icon-button
                                        aria-label="Clear"
                                        (click)="employee.name=''">
                                    <mat-icon>close</mat-icon>
                                </button>
                                <mat-hint align="start" *ngIf="surname.valid">
                                    {{hints.MAX_LENGTH(fieldLength.USER_MAX_SURNAME)}}
                                </mat-hint>
                                <mat-hint align="end">
                                    {{employee.surname ? employee.surname.length : 0}} / {{fieldLength.USER_MAX_SURNAME}}
                                </mat-hint>
                                <mat-error align="start"
                                           *ngIf="surname.invalid && (surname.dirty || surname.touched)"
                                >{{errors.FIELD_IS_REQUIRED}}</mat-error>
                            </mat-form-field>

                            <mat-form-field class="employee-add-form__form-field">
                                <input matInput
                                       placeholder="Patronymic"
                                       name="patronymic"
                                       [(ngModel)]="employee.patronymic"
                                       #patronymic="ngModel"
                                       [maxLength]="fieldLength.USER_MAX_PATRONYMIC">
                                <button mat-button *ngIf="employee.patronymic ? employee.patronymic.length > 0 : false"
                                        matSuffix mat-icon-button
                                        aria-label="Clear"
                                        (click)="employee.name=''">
                                    <mat-icon>close</mat-icon>
                                </button>
                                <mat-hint align="start"
                                          *ngIf="patronymic.valid && (patronymic.touched || patronymic.dirty)">
                                    {{hints.MAX_LENGTH(fieldLength.USER_MAX_PATRONYMIC)}}
                                </mat-hint>
                                <mat-hint align="end">
                                    {{employee.patronymic ? employee.patronymic.length : 0}}
                                    / {{fieldLength.USER_MAX_PATRONYMIC}}
                                </mat-hint>
                            </mat-form-field>

                            <mat-form-field class="employee-add-form__form-field">
                                <input matInput
                                       class="employee-add-form__manager_input"
                                       required
                                       placeholder="Superior"
                                       name="superior"
                                       (mousedown)="selectManager()"
                                       [value]="manager | fullName">
                            </mat-form-field>

                            <mat-form-field class="employee-add-form__form-field">
                                <input matInput
                                       required
                                       [matDatepicker]="picker"
                                       placeholder="Pick birthdate"
                                       name="birthDate"
                                       #birthDate="ngModel"
                                       [(ngModel)]="employee.birthDate"
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
                        <mat-card-actions class="employee-add-form__button-group">
                            <div class="employee-add-form__reset-button-content">
                                <button mat-raised-button
                                        class="employee-add-form__reset-button"
                                        type="button"
                                        color="warn"
                                        (click)="askResetPermission()"
                                >Clear</button>
                            </div>
                            <button mat-stroked-button
                                    class="employee-add-form__back-button"
                                    type="button"
                                    color="primary"
                                    (click)="back()"
                            >Back</button>
                            <button mat-raised-button
                                    class="employee-add-form__save-button"
                                    [disabled]="form.invalid || sending || sent"
                                    type="submit"
                                    color="primary"
                            >Save</button>
                        </mat-card-actions>
                        <mat-progress-bar mode="indeterminate" *ngIf="sending"></mat-progress-bar>
                    </div>
                    <ng-template #SelectManager>
                        <manager-selection-component (manager)="getManager($event)"
                                                     (cancel)="cancelSelection()">
                        </manager-selection-component>
                    </ng-template>
                </mat-card>
            </form>
        </div>
    `,
    styleUrls: ['./employee-add-form.component.css']
})

export class EmployeeFormComponent {
    private fieldLength = FieldLength;
    private errors = Errors;
    private hints = Hints;
    private messages = Messages;

    private emailRegExp: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    private sending: boolean = false;
    private sent: boolean = false;
    private selecting: boolean = false;

    private employee: Employee = {} as Employee;
    private manager: Manager = {} as Manager;

    constructor(
        private employeeHttpService: EmployeeHttpService,
        private location: Location,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    save() {
        this.sending = true;
        this.employeeHttpService
            .add(this.employee)
            .subscribe(
                () => {
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
        this.employee = {} as Employee;
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

    selectManager() {
        this.selecting = true;
    }

    getManager(manager: Manager) {
        this.selecting = false;
        this.manager = manager;
        this.employee.superior = manager.id;
    }

    cancelSelection() {
        this.selecting = false;
    }
}
