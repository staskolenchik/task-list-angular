import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";
import {Urls} from "../../shared/constants/urls";
import {LoginDto} from "./login-dto";
import {catchError, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {Errors} from "../../shared/constants/errors";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private errors = Errors;

    private _url = Urls.LOGIN;
    private _redirectUrl = '/';

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private router: Router
    ){}

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        if (error.error instanceof ErrorEvent) {
            this.snackBar.open(error.error.toString(), "Close", {duration: 5000});
        } else if (error.status === 0) {
            const errorMessage = this.errors.CONNECTION_FAILED;
            this.snackBar.open(errorMessage, "Close", {duration: 5000});
            console.log(error.message);
        } else if (error.status === 403) {
            const errorMessage = this.errors.EMAIL_OR_PASSWORD_IS_INVALID;
            this.snackBar.open(errorMessage, "Close", {duration: 5000});
            console.log(error.message);
        } else {
            this.snackBar.open(error.error, "Close", {duration: 5000});
        }

        return throwError('Something bad happened; please try again later.');
    };

    set redirectUrl(value: string) {
        this._redirectUrl = value;
    }

    get redirectUrl(): string {
        return this._redirectUrl;
    }

    signin(loginDto: LoginDto): Observable<any> {
        return this.http
            .post(this._url, loginDto)
            .pipe(map((response: any) => {
                    const token: string = response.token;
                    const payload: any = JSON.parse(window.atob(token.split('.')[1]));

                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('sub', JSON.stringify(payload.sub));
                    sessionStorage.setItem('roles', JSON.stringify(payload.auth));
                    sessionStorage.setItem('uid', JSON.stringify(payload.uid));
                    sessionStorage.setItem('exp', JSON.stringify(payload.exp));

                    this.router.navigate([this._redirectUrl]);
                }),
                catchError((error) => this.handleError(error))
            );
    }
}
