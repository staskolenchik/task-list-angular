import {Component, Input} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";

@Component({
    selector: "manager-profile-component",
    template: `
        <div *ngIf="profile.id">
            <h3>Manager profile</h3>
            <div>
                <label>Email: </label>
                <span>{{profile.email}}</span>
            </div>
            <div>
                <label>First Name: </label>
                <span>{{profile.name}}</span>
            </div>
            <div>
                <label>Surname: </label>
                <span>{{profile.surname}}</span>
            </div>
            <div>
                <label>Patronymic: </label>
                <span>{{profile.patronymic}}</span>
            </div>
            <div>
                <label>Birth Date: </label>
                <span>{{profile.birthDate}}</span>
            </div>
        </div>
    `,
    styles: []
})

export class ManagerProfileComponent {
    private profile: Manager = {} as Manager;

    @Input()
    set manager(profile: Manager) {
        this.profile = profile || {} as Manager;
    }
}