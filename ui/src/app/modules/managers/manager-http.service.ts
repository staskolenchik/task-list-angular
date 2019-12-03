import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Manager} from "../../shared/models/manager";
import {MatSnackBar} from "@angular/material";
import {Urls} from "../../shared/constants/urls";
import {Page} from "../../shared/models/page";

@Injectable()
export class ManagerHttpService {

    private url: string = Urls.MANAGER;

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) {}

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            this.snackBar.open(error.error.toString(), "Close", {duration: 5000});
        } else {
            this.snackBar.open(error.error.toString(), "Close", {duration: 5000});
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
                            confirmPassword: null,
                            name: manager.name,
                            surname: manager.surname,
                            patronymic: manager.patronymic,
                            birthDate: manager.birthDate,
                        }
                    })
                }),
                catchError((error) => this.handleError(error))
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
                catchError((error) => this.handleError(error))
            );
    }

    delete(manager: Manager): Observable<any> {
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

    findAll(page: Page) {
        let params = new HttpParams();
        params = params.set('page', page.number.toString());
        params = params.set('size', page.size.toString());

        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http
            .get(this.url, {headers, params})
            .pipe(map((response: any) => {
                    const managers: Manager[] = [].concat(response.content);
                    const page: Page = {
                        length: response.totalElements,
                        number: response.number,
                        size: response.size
                    };

                    return {
                        content: managers,
                        page: page
                    }
                },
                catchError((error) => this.handleError(error))
            ));
    }
}
