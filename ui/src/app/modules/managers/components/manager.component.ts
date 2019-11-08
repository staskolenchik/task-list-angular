import {Component, OnInit} from "@angular/core";
import {ManagerService} from "../manager.service";
import {Manager} from "../../../shared/models/manager";


@Component({
    selector: 'manager-component',
    template: `
        <manager-form-component [manager]="manager" 
                                (add)="add($event)"
                                (update)="update($event)"
        ></manager-form-component>
        <div class="mat-app-background manager-list">
            <manager-list-component [managers]="managers"
                                    (delete)="delete($event)"
                                    (updateForm)="updateForm($event)"
                                    (showProfile)="showProfile($event)"
            >Loading...</manager-list-component>
        </div>
        
        <manager-profile-component [manager]="profile"></manager-profile-component>
    `,
    styleUrls: ['./manager.component.css'],
    providers: [ManagerService]
})

export class ManagerComponent implements OnInit{
    private managers: Manager[] = [];
    private manager: Manager;
    private profile: Manager;

    constructor(private managerService: ManagerService) {
    }

    ngOnInit(): void {
        this.managerService
            .getAll()
            .subscribe(managers => this.managers = managers);
    }

    add(manager: Manager) {
        this.managerService
            .add(manager)
            .subscribe(manager => {
                this.managers.push(manager);
            })
    }

    delete(manager: Manager) {
        this.managerService
            .delete(manager)
            .subscribe(response => {
                let index = this.managers.indexOf(manager);
                if (index > -1) {
                    this.managers.splice(index, 1);
                }
            })
    }

    updateForm(manager: Manager) {
        this.manager = manager;
    }

    update(manager: Manager) {
        this.managerService
            .update(manager)
            .subscribe(updatedManager => {
                let index = this.managers.indexOf(manager);
                this.managers.splice(index, 1, updatedManager);
            })
    }

    showProfile(manager: Manager) {
        this.managerService
            .get(manager)
            .subscribe(manager => {
                this.profile = manager;
            })
    }
}
