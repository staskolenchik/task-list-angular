import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Role} from "../shared/models/user-role-enum";

@Injectable({
    providedIn: "root"
})
export class ManagerAuthGuard implements CanActivate{

    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAdmin: boolean = this.checkManagerRole();

        if (!isAdmin) {
            this.router.navigate(['/forbidden']);
        }

        return isAdmin;
    }

    private checkManagerRole(): boolean {
        const roles: string[] = JSON.parse(sessionStorage.getItem('roles'));
        let isAllowed: boolean = false;

        roles.filter((element: string) => {
            if (element === Role.MANAGER) {
                isAllowed = true;
            }
        });

        return isAllowed;
    }
}
