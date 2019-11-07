import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TaskComponent} from "./components/task.component";

const taskRoutes: Routes = [
    {path: "tasks", component: TaskComponent}
];

@NgModule({
    imports: [RouterModule.forChild(taskRoutes)]
})

export class TaskRoutingModule {
}
