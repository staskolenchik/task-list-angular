import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmployeeFormComponent} from "./components/add-employee/employee-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EmployeeComponent} from "./components/employee.component";

@NgModule({
    declarations: [EmployeeFormComponent, EmployeeComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: [EmployeeFormComponent, EmployeeComponent]
})

export class EmployeeModule {

}