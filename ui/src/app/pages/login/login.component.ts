import {Component} from "@angular/core";
import {Hints} from "../../shared/constants/hints";
import {FieldLength} from "../../shared/constants/field-length";
import {Errors} from "../../shared/constants/errors";
import {LoginDto} from "./login-dto";
import {LoginService} from "./login-service";

@Component({
    selector: 'login-component',
    template: `
        <div class="login-page">
            <form #form="ngForm" (ngSubmit)="onSignIn()" class="login-page__form">
                <mat-card class="mat-elevation-z8">
                    <mat-card-title align="center">Login</mat-card-title>
                    <mat-card-content>
                        <mat-form-field class="login-page__form-field">
                            <input matInput
                                   type="email"
                                   placeholder="Email"
                                   required
                                   name="email"
                                   [(ngModel)]="loginDto.email"
                                   #email="ngModel"
                                   autofocus
                                   [maxLength]="fieldLength.USER_MAX_EMAIL">
                            <button mat-button *ngIf="loginDto.email ? loginDto.email.length > 0 : false"
                                    matSuffix mat-icon-button
                                    aria-label="Clear"
                                    (click)="loginDto.email=''">
                                <mat-icon>close</mat-icon>
                            </button>
                            <mat-hint align="start" *ngIf="email.valid">
                                {{hints.MAX_LENGTH(fieldLength.USER_MAX_EMAIL)}}
                            </mat-hint>
                            <mat-hint align="end">
                                {{loginDto.email ? loginDto.email.length : 0}} / {{fieldLength.USER_MAX_EMAIL}}
                            </mat-hint>
                            <mat-error align="start"
                                       *ngIf="email.invalid && (email.dirty || email.touched)"
                            >{{errors.FIELD_IS_REQUIRED}}</mat-error>
                        </mat-form-field>
                        <mat-form-field class="login-page__form-field">
                            <input matInput
                                   type="password"
                                   placeholder="Password"
                                   required
                                   name="password"
                                   [(ngModel)]="loginDto.password"
                                   #password="ngModel"
                                   minlength="{{fieldLength.USER_MIN_PASSWORD}}"
                                   [maxLength]="fieldLength.USER_MAX_PASSWORD">
                            <button mat-button *ngIf="loginDto.password ? loginDto.password.length > 0 : false"
                                    matSuffix mat-icon-button
                                    aria-label="Clear"
                                    (click)="loginDto.password=''">
                                <mat-icon>close</mat-icon>
                            </button>
                            <mat-hint align="start" *ngIf="loginDto.password ? loginDto.password.length >= fieldLength.USER_MIN_PASSWORD : false">
                                {{hints.MAX_LENGTH(fieldLength.USER_MAX_PASSWORD)}}
                            </mat-hint>
                            <mat-hint align="end">
                                {{loginDto.password ? loginDto.password.length : 0}} / {{fieldLength.USER_MAX_PASSWORD}}
                            </mat-hint>
                            <mat-error align="start"
                                       *ngIf="password.invalid && (password.dirty || password.touched)"
                            >{{errors.PASSWORD_REQUIRED_CHARACTERS}}{{fieldLength.USER_MIN_PASSWORD - loginDto.password ? loginDto.password.length : 0}}</mat-error>
                        </mat-form-field>
                    </mat-card-content>
                    <mat-card-actions>
                        <button type="submit" mat-raised-button color="primary">
                            Sign In
                        </button>
                    </mat-card-actions>
                    <mat-progress-bar *ngIf="sending" mode="indeterminate"></mat-progress-bar>
                </mat-card>
            </form>
        </div>
    `,
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    private hints = Hints;
    private fieldLength = FieldLength;
    private errors = Errors;

    private loginDto: LoginDto = {} as LoginDto;
    private sending: boolean = false;

    constructor(private loginService: LoginService) {}

    onSignIn(): void {
        this.sending = true;
        this.loginService.signin(this.loginDto)
            .subscribe(
                () => {
                    this.sending = false;
                },
                () => {
                    this.sending = false;
                });
    }
}
