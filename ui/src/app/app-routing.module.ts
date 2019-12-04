import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./modules/about/components/about.component";
import {LoginComponent} from "./pages/login/login.component";
import {ForbiddenComponent} from "./pages/forbidden/forbidden.component";
import {AuthGuard} from "./auth/auth.guard";
import {AdminAuthGuard} from "./auth/admin.auth.guard";

const appRoutes: Routes = [
    {path: '', component: AboutComponent},
    {
        path: 'managers',
        loadChildren: () => import('./modules/managers/manager.module')
            .then(mod => mod.ManagerModule),
        canActivate: [AuthGuard, AdminAuthGuard]
    },
    {
        path: 'employees',
        loadChildren: () => import('./modules/employees/employee.module')
            .then(mod => mod.EmployeeModule),
        canActivate: [AuthGuard, AdminAuthGuard]
    },
    {path: 'login', component: LoginComponent},
    {path: 'forbidden', component: ForbiddenComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true}
        )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
