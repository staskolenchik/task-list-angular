import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Role} from "../shared/models/user-role-enum";

@Injectable({
    providedIn: "root"
})
export class AdminAuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAdmin: boolean = this.checkAdminRole();

        if (!isAdmin) {
            this.router.navigate(['/forbidden']);
        }

        return isAdmin;
    }

    private checkAdminRole(): boolean {
        const roles: string[] = JSON.parse(localStorage.getItem('roles'));
        let isAllowed: boolean = false;

        roles.filter((element: string) => {
            if (element === Role.ADMIN) {
                isAllowed = true;
            }
        });

        return isAllowed;
    }
}
