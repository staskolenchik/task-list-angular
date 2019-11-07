import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template:`
        <div>
            <header>
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
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
}
