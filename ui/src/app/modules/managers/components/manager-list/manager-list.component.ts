import {Component, OnInit} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";
import {ManagerService} from "../../manager.service";
import {Router} from "@angular/router";

@Component({
    selector: "manager-list-component",
    template: `
        <button mat-raised-button class="manager-list__add-manager-button"
                color="primary"
                routerLink="form"
        >New Manager
        </button>
        <mat-card class="mat-elevation-z8 manager_list_content">
            <mat-card-title>Manager List</mat-card-title>
            <table mat-table [dataSource]="managers">
                <ng-container matColumnDef="email">
                    <th mat-header-cell *matHeaderCellDef>Email</th>
                    <td mat-cell *matCellDef="let manager">{{manager.email}}</td>
                </ng-container>
                <ng-container matColumnDef="fullName">
                    <th mat-header-cell *matHeaderCellDef>Full Name</th>
                    <td mat-cell
                        *matCellDef="let manager">{{manager.name}} {{manager.surname}} {{manager.patronymic}}</td>
                </ng-container>
                <ng-container matColumnDef="birthDate">
                    <th mat-header-cell *matHeaderCellDef>Birth Date</th>
                    <td mat-cell *matCellDef="let manager">{{manager.birthDate}}</td>
                </ng-container>
                <ng-container matColumnDef="options">
                    <th mat-header-cell *matHeaderCellDef>Options</th>
                    <td mat-cell *matCellDef="let manager">
                        <button mat-button
                                class="manager-list__option-button"
                                color="accent"
                                (click)="onUpdate(manager)">
                            <mat-icon aria-label="Update icon">
                                update
                            </mat-icon>
                        </button>
                        <button mat-button
                                color="warn"
                                (click)="onDelete(manager)">
                            <mat-icon aria-label="Delete icon">
                                delete
                            </mat-icon>
                        </button>
                        <button mat-button
                                color="primary"
                                (click)="openProfile(manager)">
                            <mat-icon aria-label="Profile icon">
                                info
                            </mat-icon>
                        </button>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
                <tr mat-row *matRowDef="let row; columns: columnsToDisplay;"></tr>
            </table>
        </mat-card>
    `,
    styleUrls: ['./manager-list.component.css']
})

export class ManagerListComponent implements OnInit{
    columnsToDisplay = ['email', 'fullName', 'birthDate', 'options'];

    constructor(
        private managerService: ManagerService,
        private router: Router
    ) {}

    private managers: Manager[] = [];

    ngOnInit(): void {
        this.managerService
            .getAll()
            .subscribe(managers => this.managers = managers);
    }

    onDelete(manager: Manager): void {
        this.managerService
            .delete(manager)
            .subscribe(() => {
                let index = this.managers.indexOf(manager);
                if (index > -1) {
                    this.managers.splice(index, 1);
                }
            })
    }

    onUpdate(manager: Manager): void {
        this.router.navigate([`managers/${manager.id}`])
    }

    openProfile(manager: Manager): void {
        this.router.navigate([`managers/profile/${manager.id}`])
    }
}
