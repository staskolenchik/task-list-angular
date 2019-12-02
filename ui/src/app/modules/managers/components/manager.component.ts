import {Component} from "@angular/core";
import {ManagerService} from "../manager.service";


@Component({
    selector: 'manager-component',
    template: `        
        <router-outlet></router-outlet>
    `,
    styleUrls: ['./manager.component.css'],
    providers: [ManagerService]
})

export class ManagerComponent {
}
