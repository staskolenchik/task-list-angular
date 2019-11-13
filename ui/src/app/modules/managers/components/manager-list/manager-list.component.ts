import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";

@Component({
    selector: "manager-list-component",
    template: `        
            <mat-card class="mat-elevation-z8">
                <mat-card-title>Manager List</mat-card-title>
                <table mat-table [dataSource]="managers"> 
                    <ng-container matColumnDef="email">
                        <th mat-header-cell *matHeaderCellDef>Email</th>
                        <td mat-cell *matCellDef="let manager">{{manager.email}}</td>
                    </ng-container>
                    <ng-container matColumnDef="fullName">
                        <th mat-header-cell *matHeaderCellDef>Full Name</th>
                        <td mat-cell *matCellDef="let manager">{{manager.name}} {{manager.surname}} {{manager.patronymic}}</td>
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
                                <mat-icon aria-label="Update icon" >
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

export class ManagerListComponent {

    columnsToDisplay = ['email', 'fullName', 'birthDate', 'options'];

    @Input() managers: Manager[];

    @Output() delete: EventEmitter<Manager> = new EventEmitter();
    @Output() updateForm: EventEmitter<Manager> = new EventEmitter();
    @Output() showProfile: EventEmitter<Manager> = new EventEmitter();

    onDelete(manager: Manager) {
        this.delete.emit(manager);
    }

    onUpdate(manager:Manager) {
        this.updateForm.emit(manager);
    }

    openProfile(manager: Manager) {
        this.showProfile.emit(manager);
    }
}
