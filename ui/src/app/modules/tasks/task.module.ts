import {NgModule} from "@angular/core";
import {TaskComponent} from "./components/task.component";
import {UsernameMenuComponent} from "../../shared/components/username-menu.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TaskRoutingModule} from "./task-routing.module";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule
} from "@angular/material";
import {TaskFormComponent} from "./components/task-form/task-form.component";


@NgModule({
    declarations: [
        TaskComponent,
        TaskListComponent,
        TaskFormComponent,
        UsernameMenuComponent
    ],
    imports: [
        TaskRoutingModule,
        CommonModule,
        FormsModule,
        MatGridListModule,
        MatCardModule,
        MatTableModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatButtonModule
    ],
    exports: [
        TaskComponent,
        TaskListComponent,
        TaskFormComponent,
        UsernameMenuComponent
    ]
})

export class TaskModule {
}
