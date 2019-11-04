import {Component, EventEmitter, Output} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";

@Component({
    selector: "manager-form-component",
    template: `
        <h3>Manager form</h3>
        <form class="manager-form" (ngSubmit)="onSubmit()" novalidate>
            <div>
                <label for="manager-email">Email: </label>
                <input id="manager-email"
                       type="text"
                       name="email"
                       [(ngModel)]="manager.email">
            </div>
            <div>
                <label for="manager-password">Password: </label>
                <input id="manager-password"
                       type="password"
                       name="password"
                       [(ngModel)]="manager.password">
            </div>
            <div>
                <label>First Name: </label>
                <input type="text"
                       name="name"
                       [(ngModel)]="manager.name">
            </div>
            <div>
                <label>Surname: </label>
                <input type="text"
                       name="surname"
                       [(ngModel)]="manager.surname">
            </div>
            <div>
                <label>Patronymic: </label>
                <input type="text"
                       name="patronymic"
                       [(ngModel)]="manager.patronymic">
            </div>
            <div>
                <label>Birth Date: </label>
                <input type="text"
                       name="birthDate"
                       [(ngModel)]="manager.birthDate">
            </div>
            <br>
            <button>Submit</button>
        </form>
    `,
    styles: []
})

export class ManagerFormComponent {
    private manager: Manager = {} as Manager;

    @Output() add: EventEmitter<Manager> = new EventEmitter();

    onSubmit() {
        this.add.emit(this.manager);
        this.manager = {} as Manager;
    }

}