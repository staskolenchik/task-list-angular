import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, map, retry} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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

    getAll() : Observable<Manager[]>{ //added observable!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return this.http
            .get(this.url)
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
                retry(3),
                catchError(this.handleError)
            );
    }

    add(manager: Manager) : Observable<Manager> {
        console.log(manager);
        return this.http
            .post<Manager>(this.url, manager)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }
}