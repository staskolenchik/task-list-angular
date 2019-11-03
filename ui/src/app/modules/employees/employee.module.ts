import {NgModule} from "@angular/core";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {CommonModule} from "@angular/common";
import {EmployeeFormComponent} from "./components/add-employee/employee-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeeComponent} from "./components/employee.component";

@NgModule({
    declarations: [EmployeeListComponent, EmployeeFormComponent, EmployeeComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [EmployeeListComponent],
    exports: [EmployeeListComponent, EmployeeFormComponent, EmployeeComponent]
})

export class EmployeeModule {

}