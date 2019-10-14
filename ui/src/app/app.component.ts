import {Component} from '@angular/core';
import {TaskService} from "./modules/tasks/task.service"

@Component({
    selector: 'my-app',
    template:`
        <div>
            <task-component></task-component>
        </div>
    `,
    providers: [TaskService]
})

export class AppComponent {
}