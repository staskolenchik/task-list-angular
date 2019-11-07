import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {TaskModule} from "./modules/tasks/task.module";
import {EmployeeModule} from "./modules/employees/employee.module";
import {ManagerModule} from "./modules/managers/manager.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    imports:[
        AppRoutingModule,
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
