import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {ApplicationInfo} from "../../shared/models/application-info";

@Injectable()
export class AboutService {

    private url: string = "http://localhost:8081/dev/about";

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

    constructor(private http: HttpClient) {
    }

    get(): Observable<ApplicationInfo> {
        return this.http
            .get<ApplicationInfo>(this.url)
            .pipe(
                retry(3),
                catchError(this.handleError)
            )
    }
}
