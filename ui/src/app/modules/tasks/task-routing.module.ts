import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TaskFormComponent} from "./components/task-form/task-form.component";
import {TaskListEmployeeComponent} from "./components/task-list-employee/task-list-employee.component";
import {TaskListManagerComponent} from "./components/task-list-manager/task-list-manager.component";
import {TaskInfoComponent} from "./components/task-info/task-info.component";

const taskRoutes: Routes = [
    {path: 'tasks', component: TaskListManagerComponent},
    {path: 'tasks/employee', component: TaskListEmployeeComponent},
    {path: 'tasks/task-form', component: TaskFormComponent},
    {path: 'tasks/:id', component: TaskInfoComponent},
];

@NgModule({
    imports: [RouterModule.forChild(taskRoutes)]
})

export class TaskRoutingModule {
}
