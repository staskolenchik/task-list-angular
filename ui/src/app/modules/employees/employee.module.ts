import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmployeeFormComponent} from "./components/employee-form/employee-form.component";
import {EmployeeComponent} from "./components/employee.component";
import {FormsModule} from "@angular/forms";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";

@NgModule({
    declarations: [EmployeeFormComponent, EmployeeComponent, EmployeeListComponent],
    imports: [
        CommonModule,
        FormsModule,
    ],
    providers: [],
    exports: [EmployeeFormComponent, EmployeeComponent, EmployeeListComponent]
})

export class EmployeeModule {

}