import {Component, OnInit} from "@angular/core";
import {FieldLength} from "../../../../shared/constants/field-length";
import {Errors} from "../../../../shared/constants/errors";
import {Hints} from "../../../../shared/constants/hints";
import {Messages} from "../../../../shared/constants/messages";
import {Manager} from "../../../../shared/models/manager";
import {ManagerHttpService} from "../../manager-http.service";
import {Location} from "@angular/common";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ClearFormPermissionComponent} from "../../../../shared/modal-dialogs/clear-form/clear-form-permission.component";

@Component({
    selector: 'manager-update-form-component',
    template: `
        <div class="manager-update-form">
            <form #form="ngForm" (ngSubmit)="update()">
                <mat-card class="mat-elevation-z8">
                    <mat-card-title>Update Manager Info</mat-card-title>
                    <mat-card-content>
                        <mat-form-field class=" manager-update-form__form-field">
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

                        <mat-form-field class=" manager-update-form__form-field">
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

                        <mat-form-field class=" manager-update-form__form-field">
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

                        <mat-form-field class=" manager-update-form__form-field">
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
                    <mat-card-actions class="manager-update-form__button-group">
                        <div class="manager-update-form__reset-button-content">
                            <button mat-raised-button
                                    class="manager-update-form__reset-button"
                                    type="button"
                                    color="warn"
                                    (click)="askResetPermission()"
                                    [disabled]="sending || sent"
                            >Clear
                            </button>
                        </div>
                        <button mat-stroked-button
                                class="manager-update-form__back-button"
                                type="button"
                                color="primary"
                                (click)="back()"
                        >Back
                        </button>
                        <button mat-raised-button
                                class="manager-update-form__save-button"
                                [disabled]="form.invalid || sending || sent"
                                type="submit"
                                color="primary"
                        >Save
                        </button>
                    </mat-card-actions>
                    <mat-progress-bar mode="indeterminate" *ngIf="sending"></mat-progress-bar>
                </mat-card>
            </form>
        </div>
    `,
    styleUrls: ['./manager-update-form.component.css']
})
export class ManagerUpdateFormComponent implements OnInit{
    private fieldLength = FieldLength;
    private errors = Errors;
    private hints = Hints;
    private messages = Messages;

    private sending: boolean = false;
    private sent: boolean = false;

    private manager: Manager = {} as Manager;

    constructor(
        private managerHttpService: ManagerHttpService,
        private location: Location,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        const paths = this.location.path().split('/');
        const id = paths[paths.length - 1];
        this.managerHttpService
            .findById(id)
            .subscribe(manager => this.manager = manager);
    }

    update() {
        this.sending = true;
        this.managerHttpService
            .update(this.manager)
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
