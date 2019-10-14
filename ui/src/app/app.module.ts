import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {TaskComponent} from "./modules/tasks/components/task.component";
import {UsernameMenuComponent} from "./shared/components/username-menu.component";

@NgModule({
    imports:[BrowserModule, FormsModule, HttpClientModule],
    declarations: [AppComponent, TaskComponent, UsernameMenuComponent],
    bootstrap: [AppComponent]
})

export class AppModule{}