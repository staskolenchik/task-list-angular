import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmployeeAddFormComponent} from "./components/employee-form/employee-add-form.component";
import {EmployeeComponent} from "./components/employee.component";
import {FormsModule} from "@angular/forms";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {EmployeeRoutingModule} from "./employee-routing.module";
import {EmployeeUpdateFormComponent} from "./components/employee-update-form/employee-update-form.component";
import {EmployeeProfileComponent} from "./components/employee-profile/employee-profile.component";
import {RouterModule} from "@angular/router";
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule, MatDatepickerModule,
    MatIconModule, MatInputModule, MatListModule,
    MatPaginatorModule, MatProgressBarModule, MatSortModule,
    MatTableModule
} from "@angular/material";
import {ApplicationPipesModule} from "../../pipes/application-pipes.module";
import {ManagerSelectionComponent} from "./components/manager-selection/manager-selection.component";

@NgModule({
    declarations: [
        EmployeeAddFormComponent,
        EmployeeComponent,
        EmployeeListComponent,
        EmployeeUpdateFormComponent,
        EmployeeProfileComponent,
        ManagerSelectionComponent,
    ],
    imports: [
        EmployeeRoutingModule,
        ApplicationPipesModule,
        CommonModule,
        FormsModule,
        RouterModule,
        MatCardModule,
        MatTableModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSortModule,
        MatInputModule,
        MatDatepickerModule,
        MatListModule,
    ],
    exports: [
        EmployeeAddFormComponent,
        EmployeeComponent,
        EmployeeListComponent,
        EmployeeUpdateFormComponent,
        EmployeeProfileComponent,
        ManagerSelectionComponent,
    ],
})

export class EmployeeModule {

}
