import {Component, OnInit} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";
import {ManagerHttpService} from "../../manager-http.service";
import {Router} from "@angular/router";

@Component({
    selector: "manager-manager-component",
    template: `
        <div *ngIf="manager.id">
            <h3>Manager profile</h3>
            <div>
                <label>Email: </label>
                <span>{{manager.email}}</span>
            </div>
            <div>
                <label>First Name: </label>
                <span>{{manager.name}}</span>
            </div>
            <div>
                <label>Surname: </label>
                <span>{{manager.surname}}</span>
            </div>
            <div>
                <label>Patronymic: </label>
                <span>{{manager.patronymic}}</span>
            </div>
            <div>
                <label>Birth Date: </label>
                <span>{{manager.birthDate}}</span>
            </div>
        </div>
    `
})

export class ManagerProfileComponent implements OnInit{
    private manager: Manager = {} as Manager;

    constructor(
        private managerService: ManagerHttpService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const urlPaths = this.router.url.split('/');
        const id: string = urlPaths[urlPaths.length - 1];

        this.managerService
            .findById(id)
            .subscribe((manager: Manager) => this.manager = manager);
    }
}
