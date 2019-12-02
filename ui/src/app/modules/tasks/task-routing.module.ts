import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TaskFormComponent} from "./components/task-form/task-form.component";
import {TaskListEmployeeComponent} from "./components/task-list-employee/task-list-employee.component";
import {TaskListManagerComponent} from "./components/task-list-manager/task-list-manager.component";
import {TaskInfoComponent} from "./components/task-info/task-info.component";
import {AuthGuard} from "../../auth/auth.guard";
import {ManagerAuthGuard} from "../../auth/manager.auth.guard";
import {EmployeeAuthGuard} from "../../auth/employee.auth.guard";
import {ManagerOrEmployeeAuthGuard} from "../../auth/manager-or-employee.auth.guard";

const taskRoutes: Routes = [
    {path: 'tasks', component: TaskListManagerComponent, canActivate: [AuthGuard, ManagerAuthGuard]},
    {path: 'tasks/employee', component: TaskListEmployeeComponent, canActivate: [AuthGuard, EmployeeAuthGuard]},
    {path: 'tasks/task-form', component: TaskFormComponent, canActivate: [AuthGuard, ManagerAuthGuard]},
    {path: 'tasks/:id', component: TaskInfoComponent, canActivate: [AuthGuard, ManagerAuthGuard, ManagerOrEmployeeAuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(taskRoutes)]
})

export class TaskRoutingModule {
}
