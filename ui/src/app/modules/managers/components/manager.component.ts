import {Component, OnInit} from "@angular/core";
import {ManagerService} from "../manager.service";
import {Manager} from "../../../shared/models/manager";


@Component({
    selector: 'manager-component',
    template: `
        <manager-form-component (add)="add($event)"></manager-form-component>
        <manager-list-component [managers]="managers" (delete)="delete($event)"></manager-list-component>
    `,
    styles: [],
    providers: [ManagerService]
})

export class ManagerComponent implements OnInit{
    private managers: Manager[] = [];

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
}