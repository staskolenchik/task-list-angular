import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {TaskModule} from "./modules/tasks/task.module";
import {RouterModule, Routes} from "@angular/router";
import {TaskComponent} from "./modules/tasks/components/task.component";
import {EmployeeModule} from "./modules/employees/employee.module";
import {EmployeeComponent} from "./modules/employees/components/employee.component";
import {ManagerComponent} from "./modules/managers/components/manager.component";
import {ManagerModule} from "./modules/managers/manager.module";

const appRoutes: Routes = [
    {path: '', component: TaskComponent},
    {path: 'employees', component: EmployeeComponent},
    {path: 'managers', component: ManagerComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(
          appRoutes,
            {enableTracing: true} //during dev only
        ),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TaskModule,
        EmployeeModule,
        ManagerModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule{}