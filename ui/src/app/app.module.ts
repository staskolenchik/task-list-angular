import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {TaskModule} from "./modules/tasks/task.module";

@NgModule({
    imports:[BrowserModule, FormsModule, HttpClientModule, TaskModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule{}