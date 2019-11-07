import {Component} from '@angular/core';
import {TaskService} from "./modules/tasks/task.service"

@Component({
    selector: 'my-app',
    template:`
        <div>
            <header>
                <h1>Task List</h1>
                <nav>
                    <ul>
                        <li><a routerLink="/tasks">Tasks</a></li>
                        <li><a routerLink="/employees">Employees</a></li>
                        <li><a routerLink="/managers">Managers</a> </li>
                    </ul>
                </nav>
            </header>
            <router-outlet></router-outlet>
        </div>
    `,
    providers: [TaskService]
})

export class AppComponent {
}
