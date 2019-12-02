import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ManagerComponent} from "./components/manager.component";
import {AuthGuard} from "../../auth/auth.guard";
import {AdminAuthGuard} from "../../auth/admin.auth.guard";

const managerRoutes: Routes = [
    {path: 'managers', component: ManagerComponent, canActivate: [AuthGuard, AdminAuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(managerRoutes)],
})

export class ManagerRoutingModule {

}
