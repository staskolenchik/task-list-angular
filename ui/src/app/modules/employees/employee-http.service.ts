import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, map, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Employee} from "../../shared/models/employee";
import {Manager} from "../../shared/models/manager";
import {Page} from "../../shared/models/page";
import {Urls} from "../../shared/constants/urls";

@Injectable()
export class EmployeeHttpService {

    private url: string = Urls.EMPLOYEE;

    constructor(private http: HttpClient) {}

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
        return this.http
            .get(this.url)
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

        return this.http
            .post<Employee>(this.url, employee)
            .pipe(
                catchError(this.handleError)
            )
    }

    update(employee: Employee): Observable<Employee> {
        let url = `${this.url}/${employee.id}`;

        return this.http
            .put<Employee>(url, employee)
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(employee: Employee) {
        const url = `${this.url}/${employee.id}`;

        return this.http
            .delete(url)
            .pipe(
                catchError(this.handleError)
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
                        name: employee.name,
                        surname: employee.surname,
                        patronymic: employee.patronymic,
                        birthDate: employee.birthDate,
                        superior: employee.superior
                    }
                })
            }))
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
}
