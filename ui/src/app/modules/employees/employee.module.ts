import {NgModule} from "@angular/core";
import {EmployeeComponent} from "./components/employee.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [EmployeeComponent],
    imports: [
        CommonModule
    ],
    providers: [EmployeeComponent],
    exports: [EmployeeComponent]
})

export class EmployeeModule {

}