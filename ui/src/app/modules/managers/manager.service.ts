import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {Employee} from "../../shared/models/employee";
import {catchError, map, retry} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

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

    getAll() : Observable<Employee[]>{ //added observable!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return this.http
            .get(this.url)
            .pipe(map(data => {
                    let employees = [].concat(data);
                    return employees.map(function (employee: any) {
                        return {
                            id: employee.id,
                            email: employee.email,
                            password: null,
                            name: employee.name,
                            surname: employee.surname,
                            patronymic: employee.patronymic,
                            birthDate: employee.birthDate,
                            managerId: employee.managerId
                        }
                    })
                }),
                retry(3),
                catchError(this.handleError)
            );
    }
}