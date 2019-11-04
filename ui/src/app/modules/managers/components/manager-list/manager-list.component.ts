import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";

@Component({
    selector: "manager-list-component",
    template: `
        <div *ngIf="managers.length === 0; else showManagers">Loading...</div>
        <ng-template #showManagers>
            <h3>Manager List</h3>
            <table border="1" cellpadding="2">
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Full name</td>
                        <td>Birth date</td>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let manager of managers">
                        <td>{{manager.email}}</td>
                        <td>{{manager.name}} {{manager.surname}} {{manager.patronymic}}</td>
                        <td>{{manager.birthDate}}</td>
                        <button (click)="onDelete(manager)">Delete</button>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    `
})

export class ManagerListComponent {

    @Input() managers: Manager[];

    @Output() delete: EventEmitter<Manager> = new EventEmitter();

    onDelete(manager: Manager) {
        this.delete.emit(manager);
    }
}