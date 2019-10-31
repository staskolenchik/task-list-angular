import {Component, OnInit} from "@angular/core";
import {Task} from "../../../shared/models/task";
import {TaskService} from "../task.service";

@Component({
    selector: "task-component",
    template: `
        <username-menu></username-menu>
        <div>
            <h4>Create task</h4>
            <label>Task Subject: </label>
            <input name="subject" [(ngModel)]="task.subject"/>
            <br>
            <label>Task Description: </label>
            <textarea name="description" cols="40" rows="5" [(ngModel)]="task.description"></textarea>
            <div>
                <button (click)="save()">Save</button>
            </div>
        </div>
        <h3>Task List</h3>
        <ul>
            <li *ngFor="let task of tasks" class="task">
                <h4>{{task.subject}}</h4>
                <p>{{task.description}}</p>
                <div>
                    <button (click)="fillForm(task)">Update</button>
                    <button (click)="delete(task)">Delete</button>
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

    private tasks: Task[] = [];
    private task: Task = new Task();

    private updatable: boolean = false;

    constructor (private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.taskService
            .get()
            .subscribe((data => this.tasks = data));
    }

    save() {
        if (this.updatable) {
            this.update(this.task);
            this.updatable = false;
        } else {
            this.add(this.task);
        }
    }

    add(task: Task) {
        this.taskService
            .add(task)
            .subscribe(
                (createdTask: Task) => {
                    this.task = new Task();
                    this.tasks.push(createdTask);
                },
                addError => console.log(addError)
            );
    }

    fillForm(task: Task) {
        this.task = task;
        this.updatable = true;
    }

    update(task: Task) {
        this.taskService
            .update(task)
            .subscribe(
                (updatedTask: Task) => {
                    let index: number = this.tasks.indexOf(this.task);
                    this.task = new Task();
                    this.tasks.splice(index, 1, updatedTask);
                },
                updateError => console.log(updateError)
            );
    }

    delete(task: Task) {
        this.taskService
            .delete(task.id)
            .subscribe();

        if (this.taskService.isDeleted) {
            let index = this.tasks.indexOf(task);
            this.tasks.splice(index, 1);
        } else {
            this.taskService.isDeleted = false;
        }
    }
}