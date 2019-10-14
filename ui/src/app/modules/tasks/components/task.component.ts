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
            <textarea name="description" cols="40" rows="5" [(ngModel)]="task.description"></textarea>
            <div>
                <button (click)="saveTask()">Save</button>
            </div>
        </div>
        <h3>Task List</h3>
        <ul>
            <li *ngFor="let task of tasks" class="task">
                <h4>{{task.subject}}</h4>
                <p>{{task.description}}</p>
                <div>
                    <button (click)="fillForm(task)">Update</button>
                    <button (click)="deleteTask(task)">Delete</button>
                </div>
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

    recievedTask: Task = null;

    updatable: boolean = false;

    constructor (private httpService: TaskService) {
    }

    ngOnInit(): void {
        this.httpService.getTasks().subscribe((data => this.tasks = data));
    }

    saveTask() {
        if (this.updatable) {
            this.updateTask(this.task);
            this.updatable = false;
        } else {
            this.addTask(this.task);
        }
    }

    addTask(task: Task) {
        this.httpService.addTask(task).subscribe(
            (createdTask: Task) => {
                this.task = new Task();
                this.tasks.push(createdTask);
            },
            error => console.log(error)
        );
    }

    fillForm(task: Task) {
        this.task = task;
        this.updatable = true;
    }

    updateTask(task: Task) {
        this.httpService.updateTask(task).subscribe(
            (updatedTask: Task) => {
                let index: number = this.tasks.indexOf(this.task);
                this.task = new Task();
                this.tasks.splice(index, 1, updatedTask);
            },
            updateError => console.log(updateError)
        );
    }

    deleteTask(task: Task) {
        this.httpService.deleteTask(task.id).subscribe();
        if (this.httpService.isDeleted) {
            let index = this.tasks.indexOf(task);
            this.tasks.splice(index, 1);
        }
    }
}