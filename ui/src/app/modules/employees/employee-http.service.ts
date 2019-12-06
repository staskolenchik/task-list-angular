import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Employee} from "../../shared/models/employee";
import {Manager} from "../../shared/models/manager";
import {Page} from "../../shared/models/page";
import {Urls} from "../../shared/constants/urls";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class EmployeeHttpService {

    private url: string = Urls.EMPLOYEE;

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
    ) {}

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            this.snackBar.open(error.error.toString(), "Close", {duration: 5000});
        } else if (error.status === 0) {
            const errorMessage = 'Error. Please check internet connection';
            this.snackBar.open(errorMessage, "Close", {duration: 5000});
            console.log(error.message);
        } else {
            this.snackBar.open(error.error, "Close", {duration: 5000});
        }

        return throwError('Something bad happened; please try again later.');
    };

    add(employee: Employee) : Observable<Employee> {

        return this.http
            .post<Employee>(this.url, employee)
            .pipe(
                catchError((error) => this.handleError(error))
            )
    }

    update(employee: Employee): Observable<Employee> {
        let url = `${this.url}/${employee.id}`;

        return this.http
            .put<Employee>(url, employee)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    delete(employee: Employee) {
        const url = `${this.url}/${employee.id}`;

        return this.http
            .delete(url)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    getEmployeesByManagerId(manager: Manager): Observable<Employee[]> {
        const url = `${this.url}/managers/${manager.id}`;

        return this.http
            .get(url)
            .pipe(map(data => {
                    let employees = [].concat(data);
                    return employees.map(function (employee: Employee) {
                        return {
                            id: employee.id,
                            email: employee.email,
                            password: null,
                            confirmPassword: null,
                            name: employee.name,
                            surname: employee.surname,
                            patronymic: employee.patronymic,
                            birthDate: employee.birthDate,
                            superior: employee.superior
                        }
                    })
                },
                catchError((error) => this.handleError(error))
            ))
    }

    findAll(page: Page) {
        let params = new HttpParams();
        params = params.set('page', page.number.toString());
        params = params.set('size', page.size.toString());

        return this.http
            .get(this.url, {params})
            .pipe(map((response: any) => {
                    const employees: Employee[] = [].concat(response.content);
                    const page: Page = {
                        length: response.totalElements,
                        number: response.number,
                        size: response.size
                    };

                    return {
                        content: employees,
                        page: page
                    }
                },
                catchError((error) => this.handleError(error))
            ));
    }

    deleteAll(employees: Employee[]) {
        const ids: number[] = [];
        employees.forEach((employee) => {
            ids.push(employee.id);
        });

        let params = new HttpParams();
        params = params.set('ids', ids.toString());

        return this.http
            .delete(`${this.url}`, {params})
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }

    findById(id: string) {
        const url: string = `${this.url}/${id}`;

        return this.http
            .get<Employee>(url)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }
}
