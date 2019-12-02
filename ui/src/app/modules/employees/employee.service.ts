import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, map, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Employee} from "../../shared/models/employee";
import {Manager} from "../../shared/models/manager";

@Injectable()
export class EmployeeService {

    private url: string = "http://localhost:8081/dev/employees";

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

    getAll() : Observable<Employee[]>{
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http
            .get(this.url, {headers})
            .pipe(map(data => {
                    let employees = [].concat(data);
                    return employees.map(function (employee: Employee) {
                        return {
                            id: employee.id,
                            email: employee.email,
                            password: null,
                            name: employee.name,
                            surname: employee.surname,
                            patronymic: employee.patronymic,
                            birthDate: employee.birthDate,
                            superior: employee.superior
                        }
                    })
                }),
                retry(3),
                catchError(this.handleError)
            );
    }

    add(employee: Employee) : Observable<Employee> {
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        return this.http
            .post<Employee>(this.url, employee, {headers})
            .pipe(
                catchError(this.handleError)
            )
    }

    update(employee: Employee): Observable<Employee> {
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        let url = `${this.url}/${employee.id}`;
        return this.http
            .put<Employee>(url, employee, {headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(employee: Employee) {
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        const url = `${this.url}/${employee.id}`;
        return this.http
            .delete(url, {headers})
            .pipe(
                catchError(this.handleError)
            );
    }

    getEmployeesByManagerId(manager: Manager): Observable<Employee[]> {
        const authorization = 'Bearer_' + sessionStorage.getItem('token');
        let headers = new HttpHeaders({
            'Authorization': authorization
        });

        const url = `${this.url}/managers/${manager.id}`;
        return this.http
            .get(url, {headers})
            .pipe(map(data => {
                let employees = [].concat(data);
                return employees.map(function (employee: Employee) {
                    return {
                        id: employee.id,
                        email: employee.email,
                        password: null,
                        name: employee.name,
                        surname: employee.surname,
                        patronymic: employee.patronymic,
                        birthDate: employee.birthDate,
                        superior: employee.superior
                    }
                })
            }))
    }
}
