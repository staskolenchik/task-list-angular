import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {Task} from '../../shared/models/task';
import {catchError, map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";
import {Urls} from "../../shared/constants/urls";
import {Page} from "../../shared/models/page";

@Injectable()
export class TaskHttpService{

    private url = Urls.TASK;

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ){ }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            this.snackBar.open(error.message, "Close", {duration: 5000});
        } else {
            this.snackBar.open(error.message, "Close", {duration: 5000});
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
                catchError((error) => this.handleError(error))
            )
    }

    add(task: Task) : Observable<Task>{
        return this.http
            .post<Task>(this.url, task)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    update(task: Task): Observable<Task> {
        return this.http
            .put<Task>(`${this.url}/${task.id}`, task)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    delete(task: Task) {
        return this.http.delete(`${this.url}/${task.id}`)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    get(task: Task): Observable<Task> {
        let url = `${this.url}/${task.id}`;
        return this.http
            .get<Task>(url)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    findAll(page: Page, filter: any) {
        let params = new HttpParams();
        params = params.set('page', page.number.toString());
        params = params.set('size', page.size.toString());
        params = params.set('statuses', filter.statuses);

        return this.http
            .get(this.url + '/page', {params})
            .pipe(map((response: any) => {
                console.log(response);
                const tasks: Task[] = [].concat(response.content);
                const number: any = response.number;
                const size: any = response.size;
                const totalElements: any = response.totalElements;

                return {
                    content: tasks,
                    number: number,
                    size: size,
                    totalElements: totalElements,
                }
            }))
    }
}
