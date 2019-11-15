import {Component, OnInit} from "@angular/core";
import {Task} from "../../../shared/models/task";
import {TaskService} from "../task.service";
import {EmployeeService} from "../../employees/employee.service";
import {Manager} from "../../../shared/models/manager";
import {Employee} from "../../../shared/models/employee";

@Component({
    selector: "task-component",
    template: `
        <div class="task-form">
            <task-form-component [task]="task" 
                                 [assignees]="employees" 
                                 (add)="save($event)"
            >Loading...</task-form-component>
        </div>
        <div class="task-list">
            <task-list-component class="mat-app-background" 
                                 [tasks]="tasks" (changeStatus)="update($event)">
                Loading...
            </task-list-component>
        </div>
    `,
    styleUrls: ['./task.component.css'],
    providers:[TaskService, EmployeeService]
})

export class TaskComponent implements OnInit{

    private tasks: Task[] = [];
    private task: Task = {} as Task;
    private employees: Employee[];
    private manager: Manager;

    private updatable: boolean = false;

    constructor (
        private taskService: TaskService,
        private employeeService: EmployeeService
    ) {}

    ngOnInit(): void {
        this.manager = {} as Manager;
        this.manager.id = 2;

        this.taskService
            .getAll()
            .subscribe(data => {
                console.log(data);
                this.tasks = data;
            });

        this.employeeService
            .getEmployeesByManagerId(this.manager)
            .subscribe(employees => this.employees = employees)
    }

    save(task: Task) {
        console.log(task);
        this.add(task);
    }

    add(task: Task) {
        this.taskService
            .add(task)
            .subscribe(
                (createdTask: Task) => {
                    this.task = {} as Task;
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
                    this.task = {} as Task;
                    this.tasks.splice(index, 1, updatedTask);
                },
                updateError => console.log(updateError)
            );
    }

    delete(task: Task) {
        this.taskService
            .delete(task)
            .subscribe();

        if (this.taskService.isDeleted) {
            let index = this.tasks.indexOf(task);
            this.tasks.splice(index, 1);
        } else {
            this.taskService.isDeleted = false;
        }
    }
}
