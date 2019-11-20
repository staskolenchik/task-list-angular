import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template:`
        <mat-toolbar color="primary">
            <button mat-raised-button (click)="sidenav.toggle()">
                Navigation
            </button>
        </mat-toolbar>

        <mat-sidenav-container>
            <mat-sidenav #sidenav mode="side">
                <mat-nav-list class="sidenav-container__navigation-list">
                    <a mat-list-item
                       routerLink="/"
                       style="cursor: pointer">
                        <mat-icon aria-hidden="false"
                                  aria-label="Home icon" color="primary"
                        >home</mat-icon>
                    </a>
                    <a mat-list-item
                       routerLink="/tasks"
                       style="cursor: pointer"
                       [routerLinkActive]="['active']"
                    >Tasks</a>
                    <a mat-list-item
                       routerLink="/employees"
                       style="cursor: pointer"
                       [routerLinkActive]="['active']"
                    >Employees</a>
                    <a mat-list-item
                       routerLink="/managers"
                       style="cursor: pointer"
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
