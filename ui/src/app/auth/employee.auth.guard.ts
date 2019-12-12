import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Role} from "../shared/models/user-role-enum";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class EmployeeAuthGuard implements CanActivate{

    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAdmin: boolean = this.checkEmployeeRole();

        if (!isAdmin) {
            this.router.navigate(['/forbidden']);
        }

        return isAdmin;
    }

    private checkEmployeeRole(): boolean {
        const roles: string[] = JSON.parse(localStorage.getItem('roles'));
        let isAllowed: boolean = false;

        roles.filter((element: string) => {
            if (element === Role.EMPLOYEE) {
                isAllowed = true;
            }
        });

        return isAllowed;
    }

}
