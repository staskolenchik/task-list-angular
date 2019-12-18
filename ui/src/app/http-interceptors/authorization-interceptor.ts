import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token')) {
            const authorizationToken = 'Bearer_' + localStorage.getItem('token');
            const authorizedRequest = req.clone({
                setHeaders: {Authorization: authorizationToken}
            });

            return next.handle(authorizedRequest);
        }

        return next.handle(req);
    }
}
