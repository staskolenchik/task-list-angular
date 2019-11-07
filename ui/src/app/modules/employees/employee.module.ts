import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmployeeFormComponent} from "./components/employee-form/employee-form.component";
import {EmployeeComponent} from "./components/employee.component";
import {FormsModule} from "@angular/forms";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {EmployeeRoutingModule} from "./employee-routing.module";

@NgModule({
    declarations: [
        EmployeeFormComponent,
        EmployeeComponent,
        EmployeeListComponent
    ],
    imports: [
        EmployeeRoutingModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        EmployeeFormComponent,
        EmployeeComponent,
        EmployeeListComponent
    ]
})

export class EmployeeModule {

}
