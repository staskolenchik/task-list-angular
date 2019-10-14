import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {Task} from '../../shared/models/task';
import {catchError, map} from "rxjs/operators";

@Injectable()
export class TaskService{

    url = 'http://localhost:8081/dev/tasks';

    isDeleted: boolean = true;

    constructor(private http: HttpClient){ }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
            this.isDeleted = false;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
            this.isDeleted = false;
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

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

    deleteTask(id: string) {
        return this.http.delete(`${this.url}/${id}`, {}).pipe(
            catchError(this.handleError)
        );
    }
}