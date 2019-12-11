import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {Task} from '../../shared/models/task';
import {catchError, map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";
import {Urls} from "../../shared/constants/urls";
import {Page} from "../../shared/models/page";
import {Errors} from "../../shared/constants/errors";
import {TaskFilter} from "../../shared/models/task-filter";

@Injectable()
export class TaskHttpService{

    private url = Urls.TASK;
    private errors = Errors;

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ){ }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            this.snackBar.open(error.error.toString(), "Close", {duration: 5000});
        } else if (error.status === 0) {
            this.snackBar.open(this.errors.CONNECTION_FAILED, "Close", {duration: 5000});
            console.log(error.message);
        } else {
            this.snackBar.open(error.error, "Close", {duration: 5000});
        }

        return throwError('Something bad happened; please try again later.');
    };

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

    delete(task: Task): Observable<any> {
        return this.http.delete(`${this.url}/${task.id}`)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    deleteAll(tasks: Task[]) {
        const ids: number[] = [];
        tasks.forEach((task) => {
            ids.push(task.id);
        });

        let params = new HttpParams();
        params = params.set('ids', ids.toString());

        return this.http
            .delete(`${this.url}`, {params})
            .pipe(
                catchError((error) => this.handleError(error))
            )
    }

    get(task: Task): Observable<Task> {
        let url = `${this.url}/${task.id}`;

        return this.http
            .get<Task>(url)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    findAll(page: Page, filter: TaskFilter): Observable<any> {
        let params = new HttpParams();
        params = params.set('page', page.number.toString());
        params = params.set('size', page.size.toString());
        params = params.set('createdBy', filter.createdBy);

        if (filter.statuses) {
            params = params.set('statuses', filter.statuses.toString());
        }

        if (filter.employeeIds) {
            params = params.set('employeeIds', filter.employeeIds.toString());
        }

        if (filter.dateFrom) {
            const tzOffSet: number = filter.dateFrom.getTimezoneOffset() * 60000;
            const fromLocalISOTime = (new Date(filter.dateFrom.getTime() - tzOffSet)).toISOString();
            params = params.set('after', fromLocalISOTime);
        }

        if (filter.dateTo) {
            const tzOffSet: number = filter.dateTo.getTimezoneOffset() * 60000;
            const toLocalISOTime = (new Date(filter.dateTo.getTime() - tzOffSet)).toISOString();
            params = params.set('before', toLocalISOTime);
        }

        return this.http
            .get(this.url, {params})
            .pipe(map((response: any) => {
                const tasks: Task[] = response.content;
                const page: Page = {
                    length: response.totalElements,
                    number: response.number,
                    size: response.size
                };

                return {
                    content: tasks,
                    page: page
                }
            }))
    }

    findAllForEmployee(page: Page, filter: TaskFilter): Observable<any> {
        const url = `${this.url}/employee`;

        let params = new HttpParams();
        params = params.set('page', page.number.toString());
        params = params.set('size', page.size.toString());
        params = params.set('assigneeId', filter.assigneeId);

        if (filter.statuses) {
            params = params.set('statuses', filter.statuses.toString());
        }

        return this.http
            .get(url, {params})
            .pipe(map((response: any) => {
                const tasks: Task[] = response.content;
                const page: Page = {
                    length: response.totalElements,
                    number: response.number,
                    size: response.size
                };

                return {
                    content: tasks,
                    page: page
                }
            }))
    }
}
