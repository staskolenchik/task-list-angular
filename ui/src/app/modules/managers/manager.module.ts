import {NgModule} from "@angular/core";
import {ManagerComponent} from "./components/manager.component";
import {ManagerListComponent} from "./components/manager-list/manager-list.component";
import {CommonModule} from "@angular/common";
import {ManagerFormComponent} from "./components/manager-form/manager-form.component";
import {FormsModule} from "@angular/forms";
import {ManagerProfileComponent} from "./components/manager-profile/manager-profile.component";

@NgModule({
    declarations: [
        ManagerComponent,
        ManagerListComponent,
        ManagerFormComponent,
        ManagerProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ManagerComponent,
        ManagerListComponent,
        ManagerFormComponent,
        ManagerProfileComponent
    ]
})

export class ManagerModule {

}