import {NgModule} from "@angular/core";
import {ManagerComponent} from "./components/manager.component";
import {ManagerListComponent} from "./components/manager-list/manager-list.component";
import {CommonModule} from "@angular/common";
import {ManagerFormComponent} from "./components/manager-form/manager-form.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [ManagerComponent, ManagerListComponent, ManagerFormComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [ManagerComponent, ManagerListComponent, ManagerFormComponent]
})

export class ManagerModule {

}