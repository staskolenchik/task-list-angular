import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
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

    add(task: Task) : Observable<Task>{
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http
            .post<Task>(this.url, task, {headers})
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    update(task: Task): Observable<Task> {
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http
            .put<Task>(`${this.url}/${task.id}`, task, {headers})
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    delete(task: Task): Observable<any> {
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http.delete(`${this.url}/${task.id}`, {headers})
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

        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http
            .delete(`${this.url}`, {headers, params})
            .pipe(
                catchError((error) => this.handleError(error))
            )
    }

    get(task: Task): Observable<Task> {
        let url = `${this.url}/${task.id}`;

        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http
            .get<Task>(url, {headers})
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    findAll(page: Page, filter: any): Observable<any> {
        let params = new HttpParams();
        params = params.set('page', page.number.toString());
        params = params.set('size', page.size.toString());
        params = params.set('statuses', filter.statuses);

        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http
            .get(this.url, {headers, params})
            .pipe(map((response: any) => {
                const tasks: Task[] = [].concat(response.content);
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
