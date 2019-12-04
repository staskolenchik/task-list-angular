import {Component} from "@angular/core";
import {EmployeeHttpService} from "../employee-http.service";
import {ManagerHttpService} from "../../managers/manager-http.service";


@Component({
    selector: 'employee-component',
    template: `
        <router-outlet></router-outlet>
    `,
    styles: [],
    providers:[EmployeeHttpService, ManagerHttpService]
})

export class EmployeeComponent {
}
