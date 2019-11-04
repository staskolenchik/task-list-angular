import {NgModule} from "@angular/core";
import {ManagerComponent} from "./components/manager.component";
import {ManagerListComponent} from "./components/manager-list/manager-list.component";

@NgModule({
    declarations: [ManagerComponent, ManagerListComponent],
    imports: [],
    exports: [ManagerComponent, ManagerListComponent]
})

export class ManagerModule {

}