import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Task} from '../../shared/models/task';
import {map} from "rxjs/operators";

@Injectable()
export class TaskService{
    url = 'http://localhost:8081/dev/tasks';
    constructor(private http: HttpClient){ }

    getTasks() : Observable<Task[]> {
        return this.http
            .get(this.url, {responseType: "json"},)
            .pipe(map(data => {
                let tasks = [].concat(data);
                return tasks.map(function(task: any) {
                    return {
                        id: task.id,
                        subject: task.subject,
                        description: task.description
                    }
                })
            }))
    }

    addTask(task: Task) {
        return this.http
            .post(this.url, task, {});
    }
}