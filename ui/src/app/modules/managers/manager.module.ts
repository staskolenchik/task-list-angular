import {NgModule} from "@angular/core";
import {ManagerComponent} from "./components/manager.component";
import {ManagerListComponent} from "./components/manager-list/manager-list.component";
import {CommonModule} from "@angular/common";
import {ManagerAddFormComponent} from "./components/manager-add-form/manager-add-form.component";
import {FormsModule} from "@angular/forms";
import {ManagerProfileComponent} from "./components/manager-profile/manager-profile.component";
import {ManagerRoutingModule} from "./manager-routing.module";
import {
    MatButtonModule, MatButtonToggleModule,
    MatCardModule,
    MatChipsModule, MatDatepickerModule, MatDialogModule,
    MatIconModule,
    MatInputModule, MatPaginatorModule, MatProgressBarModule, MatSortModule,
    MatTableModule, MatTabsModule
} from "@angular/material";
import {ManagerUpdateFormComponent} from "./components/manager-update-form/manager-update-form.component";
import {ManagerHttpService} from "./manager-http.service";
import {ClearFormPermissionComponent} from "../../shared/modal-dialogs/clear-form/clear-form-permission.component";

@NgModule({
    declarations: [
        ManagerComponent,
        ManagerListComponent,
        ManagerAddFormComponent,
        ManagerProfileComponent,
        ManagerUpdateFormComponent,
        ClearFormPermissionComponent,
    ],
    imports: [
        ManagerRoutingModule,
        CommonModule,
        FormsModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatDialogModule,
        MatProgressBarModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    entryComponents: [
        ClearFormPermissionComponent,
    ],
    exports: [
        ManagerComponent,
        ManagerListComponent,
        ManagerAddFormComponent,
        ManagerProfileComponent,
        ManagerUpdateFormComponent,
        ClearFormPermissionComponent,
    ],
    providers: [ManagerHttpService]
})

export class ManagerModule {

}
