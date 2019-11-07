import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ManagerComponent} from "./components/manager.component";

const managerRoutes: Routes = [
    {path: 'managers', component: ManagerComponent},
];

@NgModule({
    imports: [RouterModule.forChild(managerRoutes)],
})

export class ManagerRoutingModule {

}
