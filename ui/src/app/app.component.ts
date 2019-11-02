import {Component} from '@angular/core';
import {TaskService} from "./modules/tasks/task.service"

@Component({
    selector: 'my-app',
    template:`
        <div>
            <h1>Angular Router</h1>
            <nav>
                <ul>
                <li><a routerLink="/" >Tasks</a></li>
                    <li><a routerLink="/employees" >Employees</a></li>
                </ul>
            </nav>
            <router-outlet></router-outlet>
        </div>
    `,
    providers: [TaskService]
})

export class AppComponent {
}