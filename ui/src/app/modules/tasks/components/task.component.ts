import {Component, OnInit} from "@angular/core";
import {Task} from "../../../shared/models/task";
import {TaskService} from "../task.service";

@Component({
    selector: "task-component",
    template: `
        <h3>Task List</h3>
        <ul>
            <li *ngFor="let task of tasks" class="task">
                <h4>{{task.subject}}</h4>
                <p>{{task.description}}</p>
            </li>
        </ul>
    `,
    styles: [`
        .task {
            background-color: bisque;
            margin: 10px;
            padding: 5px;
        }
    `],
    providers:[TaskService]
})

export class TaskComponent implements OnInit{

    tasks: Task[] = [];

    constructor (private httpService: TaskService) {
    }

    ngOnInit(): void {
        this.httpService.getTasks().subscribe((data => this.tasks = data));
    }
}