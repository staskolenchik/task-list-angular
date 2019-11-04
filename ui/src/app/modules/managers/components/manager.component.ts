import {Component, OnInit} from "@angular/core";
import {ManagerService} from "../manager.service";
import {Manager} from "../../../shared/models/manager";


@Component({
    selector: 'manager-component',
    template: `
        <manager-list-component></manager-list-component>
    `,
    styles: [],
    providers: [ManagerService]
})

export class ManagerComponent implements OnInit{
    private managers: Manager[] = [];

    constructor(private managerService: ManagerService) {
    }

    ngOnInit(): void {
        this.managerService.getAll().subscribe(managers => this.managers = managers);
    }
}