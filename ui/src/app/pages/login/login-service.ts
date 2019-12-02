import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material";
import {Urls} from "../../shared/constants/urls";
import {LoginDto} from "./login-dto";
import {catchError, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _url = Urls.LOGIN;
    private _redirectUrl = '/';

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private router: Router
    ){}

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            this.snackBar.open(error.message, "Close", {duration: 5000});
        } else {
            this.snackBar.open(error.message, "Close", {duration: 5000});
        }

        return throwError(
            'Something bad happened; please try again later.');
    };

    set redirectUrl(value: string) {
        this._redirectUrl = value;
    }

    get redirectUrl(): string {
        return this._redirectUrl;
    }

    signin(loginDto: LoginDto) {
        this.http
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
                catchError((error) => this.handleError(error)))
            .subscribe();
    }
}
