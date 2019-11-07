import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EmployeeComponent} from "./components/employee.component";

const employeeRoutes: Routes = [
    {path: "employees", component: EmployeeComponent}
];

@NgModule({
    imports: [RouterModule.forChild(employeeRoutes)],
})

export class EmployeeRoutingModule {
}
