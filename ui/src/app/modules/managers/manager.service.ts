import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Manager} from "../../shared/models/manager";

@Injectable()
export class ManagerService {

    private url: string = "http://localhost:8081/dev/managers";

    constructor(private http: HttpClient) {
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    };

    getAll(): Observable<Manager[]>{
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http
            .get(this.url, {headers})
            .pipe(map(data => {
                    let managers = [].concat(data);
                    return managers.map(function (manager: any) {
                        return {
                            id: manager.id,
                            email: manager.email,
                            password: null,
                            name: manager.name,
                            surname: manager.surname,
                            patronymic: manager.patronymic,
                            birthDate: manager.birthDate,
                        }
                    })
                }),
                catchError(this.handleError)
            );
    }

    add(manager: Manager): Observable<Manager> {
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http
            .post<Manager>(this.url, manager, {headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(manager: Manager): Observable<{}> {
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        const url: string = `${this.url}/${manager.id}`;
        return this.http
            .delete(url, {headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    update(manager: Manager): Observable<Manager> {
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        const url: string = `${this.url}/${manager.id}`;
        return this.http
            .put<Manager>(url, manager, {headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    get(id: string): Observable<Manager> {
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        const url: string = `${this.url}/${id}`;
        return this.http
            .get<Manager>(url, {headers})
            .pipe(
                catchError(this.handleError)
            );
    }
}
