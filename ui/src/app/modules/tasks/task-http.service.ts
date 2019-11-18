import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {Task} from '../../shared/models/task';
import {catchError, map, retry} from "rxjs/operators";

@Injectable()
export class TaskHttpService{

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

    getAll(): Observable<Task[]> {
        return this.http
            .get(this.url)
            .pipe(map(data => {
                    let tasks = [].concat(data);
                    console.log(tasks);
                    return tasks.map(function(task: any) {
                        return {
                            id: task.id,
                            subject: task.subject,
                            description: task.description,
                            status: task.status,
                            type: task.type,
                            createdById: task.createdById,
                            assigneeId: task.assigneeId,
                            creationDateTime: task.creationDateTime,
                            assigneeName: task.assigneeName,
                            assigneeSurname: task.assigneeSurname,
                        }
                    })
                }),
                //retry(3),
                catchError(this.handleError)
            )
    }

    add(task: Task) : Observable<Task>{
        return this.http
            .post<Task>(this.url, task)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    update(task: Task): Observable<Task> {
        return this.http
            .put<Task>(`${this.url}/${task.id}`, task)
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(task: Task) {
        return this.http.delete(`${this.url}/${task.id}`)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    get(task: Task): Observable<Task> {
        let url = `${this.url}/${task.id}`;
        return this.http
            .get<Task>(url)
            .pipe(
                catchError(this.handleError)
            );
    }
}
