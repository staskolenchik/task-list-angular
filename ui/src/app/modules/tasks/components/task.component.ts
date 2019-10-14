import {Component, OnInit} from "@angular/core";
import {Task} from "../../../shared/models/task";
import {TaskService} from "../task.service";

@Component({
    selector: "task-component",
    template: `
        <div>
            <h4>Create task</h4>
            <label>Task Subject: </label>
            <input name="subject" [(ngModel)]="task.subject"/>
            <br>
            <label>Task Description: </label>
            <input name="description" [(ngModel)]="task.description"/>
            <div>
                <button (click)="addTask()">Add</button>
            </div>
        </div>
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
    task: Task = new Task();

    recievedTask: Task;

    constructor (private httpService: TaskService) {
    }

    ngOnInit(): void {
        this.httpService.getTasks().subscribe((data => this.tasks = data));
    }

    addTask() {
        this.httpService.addTask(this.task).subscribe(
            (data: Task) => {this.recievedTask = data},
            error => console.log(error)
        );

        if (this.recievedTask) {
            this.task = new Task();
            this.tasks.push(this.recievedTask);
        }
    }
}