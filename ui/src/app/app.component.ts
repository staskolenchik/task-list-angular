import {Component, OnInit} from '@angular/core';
import {Role} from "./shared/models/user-role-enum";
import {Router} from "@angular/router";
import {LoginService} from "./pages/login/login-service";

@Component({
    selector: 'my-app',
    template:`
        <mat-toolbar color="primary" class="mat-elevation-z8">
            <button mat-icon-button (click)="sidenav.toggle()">
                <mat-icon>menu</mat-icon>
            </button>
            <span class="tool-bar__title"><b><i>Tasker</i></b></span>
        </mat-toolbar>

        <mat-sidenav-container>
            <mat-sidenav #sidenav mode="side">
                <mat-nav-list class="sidenav-container__navigation-list">
                    <a mat-list-item
                       routerLink="/">
                        <mat-icon aria-hidden="false"
                                  aria-label="Home icon" color="primary"
                        >home
                        </mat-icon>
                    </a>
                    <a *ngIf="!isSignedIn()"
                       mat-list-item
                       routerLink="/login"
                       [routerLinkActive]="['active']"
                    >Login</a>
                    <a *ngIf="isSignedIn()" 
                       mat-list-item
                       (click)="onLogout()"
                    >Logout</a>
                    <a *ngIf="checkEmployeeRole()"
                       mat-list-item
                       routerLink="/tasks/employee"
                       [routerLinkActive]="['active']"
                    >My Tasks</a>
                    <a *ngIf="checkManagerRole()" 
                       mat-list-item
                       routerLink="/tasks"
                       [routerLinkActive]="['active']"
                    >Manage Tasks</a>
                    <a *ngIf="checkAdminRole()" 
                       mat-list-item
                       routerLink="/employees"
                       [routerLinkActive]="['active']"
                    >Employees</a>
                    <a *ngIf="checkAdminRole()"
                       mat-list-item
                       routerLink="/managers"
                       [routerLinkActive]="['active']"
                    >Managers</a>
                </mat-nav-list>
            </mat-sidenav>

            <mat-sidenav-content class="mat-app-background content">
                <router-outlet></router-outlet>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `,
    styleUrls: ['./app.component.css'],

})

export class AppComponent implements OnInit{

    constructor(
        private router: Router,
        private loginService: LoginService,
    ) {
        const replacer = (key: any, value: any) => (typeof value === 'function') ? value.name : value;

        console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    }

    ngOnInit(): void {
        if (!(this.isSignedIn() && this.isTokenValid())) {
            this.onLogout();
        }
    }

    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('sub');
        localStorage.removeItem('roles');
        localStorage.removeItem('uid');
        localStorage.removeItem('exp');

        this.loginService.redirectUrl = '/';
        this.router.navigate(['/login']);
    }

    isSignedIn() {
        return localStorage.getItem('token');
    }

    isTokenValid() {
        const expiredIn: number = JSON.parse(localStorage.getItem('exp') + '000');
        const now: number = new Date().getTime();

        return expiredIn > now;
    }

    checkAdminRole(): boolean {
        return this.checkRole(Role.ADMIN);
    }

    checkManagerRole(): boolean {
        return this.checkRole(Role.MANAGER);
    }

    checkEmployeeRole(): boolean {
        return this.checkRole(Role.EMPLOYEE);
    }

    checkRole(role: Role): boolean {
        let isAllowed: boolean = false;

        if (this.isSignedIn() && this.isTokenValid) {
            const roles: string[] = JSON.parse(localStorage.getItem('roles'));

            roles.filter((element: string) => {
                if (element === role) {
                    isAllowed = true;
                }
            });
        }

        return isAllowed;
    }
}
