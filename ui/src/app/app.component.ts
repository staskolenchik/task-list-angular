import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template:`
        <mat-toolbar color="primary" class="tool-bar">
            <button  mat-icon-button (click)="sidenav.toggle()">
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
                        >home</mat-icon>
                    </a>
                    <a mat-list-item
                       routerLink="/tasks"
                       [routerLinkActive]="['active']"
                    >Tasks</a>
                    <a mat-list-item
                       routerLink="/employees"
                       [routerLinkActive]="['active']"
                    >Employees</a>
                    <a mat-list-item
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

export class AppComponent {
}
