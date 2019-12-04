import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmployeeFormComponent} from "./components/employee-form/employee-form.component";
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
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule, MatProgressBarModule, MatSortModule,
    MatTableModule
} from "@angular/material";

@NgModule({
    declarations: [
        EmployeeFormComponent,
        EmployeeComponent,
        EmployeeListComponent,
        EmployeeUpdateFormComponent,
        EmployeeProfileComponent,
    ],
    imports: [
        EmployeeRoutingModule,
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
    ],
    exports: [
        EmployeeFormComponent,
        EmployeeComponent,
        EmployeeListComponent,
        EmployeeUpdateFormComponent,
        EmployeeProfileComponent,
    ]
})

export class EmployeeModule {

}
