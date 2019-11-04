import {NgModule} from "@angular/core";
import {ManagerComponent} from "./components/manager.component";
import {ManagerListComponent} from "./components/manager-list/manager-list.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ManagerComponent, ManagerListComponent],
    imports: [
        CommonModule
    ],
    exports: [ManagerComponent, ManagerListComponent]
})

export class ManagerModule {

}