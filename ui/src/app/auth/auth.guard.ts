import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {LoginService} from "../pages/login/login-service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate{

    constructor(private loginService: LoginService,  private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url: string = state.url;
        return this.checkIsLogined(url);
    }

    private checkIsLogined(url: string) {
        this.loginService.redirectUrl = url;
        const token: string = localStorage.getItem('token');

        if (token) {
            const expiredIn: number = JSON.parse(localStorage.getItem('exp') + '000');
            if (this.isValid(expiredIn)) {
                return true;
            }
        }

        localStorage.removeItem('token');
        localStorage.removeItem('sub');
        localStorage.removeItem('roles');
        localStorage.removeItem('uid');
        localStorage.removeItem('exp');

        this.router.navigate(['/login']);

        return false;
    }

    private isValid(expiredIn: number) {
        const now: number = new Date().getTime();
        return expiredIn > now;
    }
}
