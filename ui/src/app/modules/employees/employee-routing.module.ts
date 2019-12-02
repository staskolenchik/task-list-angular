import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EmployeeComponent} from "./components/employee.component";
import {AuthGuard} from "../../auth/auth.guard";
import {AdminAuthGuard} from "../../auth/admin.auth.guard";

const employeeRoutes: Routes = [
    {path: "employees", component: EmployeeComponent, canActivate: [AuthGuard, AdminAuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(employeeRoutes)],
})

export class EmployeeRoutingModule {
}
