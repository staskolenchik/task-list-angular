import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {Task} from '../../shared/models/task';
import {catchError, map, retry} from "rxjs/operators";

@Injectable()
export class TaskService{

    private url: string = 'http://localhost:8081/dev/tasks';

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

    get() {
        return this.http
            .get(this.url)
            .pipe(map(data => {
                    let tasks = [].concat(data);
                    return tasks.map(function(task: any) {
                        return {
                            id: task.id,
                            subject: task.subject,
                            description: task.description
                        }
                    })
                }),
                retry(3),
                catchError(this.handleError)
            )
    }

    add(task: Task) : Observable<Task>{
        console.log(task);
        return this.http
            .post<Task>(this.url, task)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    update(task: Task) {
        return this.http
            .put(`${this.url}/${task.id}`, task)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    delete(id: string) {
        return this.http.delete(`${this.url}/${id}`)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }
}