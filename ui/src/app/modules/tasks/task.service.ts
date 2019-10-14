import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {Task} from '../../shared/models/task';
import {catchError, map} from "rxjs/operators";

@Injectable()
export class TaskService{

    private url = 'http://localhost:8081/dev/tasks';

    isDeleted: boolean = true;

    constructor(private http: HttpClient){ }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
            this.isDeleted = false;
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
            this.isDeleted = false;
        }
        return throwError(
            'Something bad happened; please try again later.');
    };

    get() : Observable<Task[]> {
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

    add(task: Task) {
        return this.http
            .post(this.url, task, {})
            .pipe(
                catchError(this.handleError)
            );
    }

    update(task: Task) {
        return this.http
            .put(`${this.url}/${task.id}`, task, {})
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(id: string) {
        return this.http.delete(`${this.url}/${id}`, {})
            .pipe(
            catchError(this.handleError)
        );
    }
}