import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";

@Component({
    selector: "manager-form-component",
    template: `
        <h3>Manager form</h3>
        <form class="manager-form" (ngSubmit)="onSubmit()">
            <div>
                <label for="manager-email">Email: </label>
                <input id="manager-email"
                       type="text"
                       name="email"
                       [(ngModel)]="_manager.email">
            </div>
            <div>
                <label for="manager-password">Password: </label>
                <input id="manager-password"
                       type="password"
                       name="password"
                       [(ngModel)]="_manager.password">
            </div>
            <div>
                <label>First Name: </label>
                <input type="text"
                       name="name"
                       [(ngModel)]="_manager.name">
            </div>
            <div>
                <label>Surname: </label>
                <input type="text"
                       name="surname"
                       [(ngModel)]="_manager.surname">
            </div>
            <div>
                <label>Patronymic: </label>
                <input type="text"
                       name="patronymic"
                       [(ngModel)]="_manager.patronymic">
            </div>
            <div>
                <label>Birth Date: </label>
                <input type="text"
                       name="birthDate"
                       [(ngModel)]="_manager.birthDate">
            </div>
            <div>
                <button>Save</button>
            </div>
            
            
        </form>
    `,
    styles: []
})

export class ManagerFormComponent {
    private _manager: Manager = {} as Manager;
    private isUpdated: boolean = false;

    @Input()
    set manager(manager: Manager) {
        this._manager = manager || {} as Manager;
        manager ? this.isUpdated = true : this.isUpdated = false;
        console.log(this.isUpdated);
    }

    @Output() add: EventEmitter<Manager> = new EventEmitter();
    @Output() update: EventEmitter<Manager> = new EventEmitter();

    onSubmit() {
        if (this.isUpdated) {
            this.submitUpdate(this._manager);
        } else {
            this.submitAdd(this._manager);
        }
    }
    private submitAdd(manager: Manager) {
        this.isUpdated = false;
        this._manager = {} as Manager;
        this.add.emit(manager);
    }

    private submitUpdate(manager: Manager) {
        this.isUpdated = false;
        this._manager = {} as Manager;
        this.update.emit(manager)
    }
}