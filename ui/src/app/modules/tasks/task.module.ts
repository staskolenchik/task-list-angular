import {NgModule} from "@angular/core";
import {TaskComponent} from "./components/task.component";
import {UsernameMenuComponent} from "../../shared/components/username-menu.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TaskRoutingModule} from "./task-routing.module";


@NgModule({
    imports: [
        TaskRoutingModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        TaskComponent,
        UsernameMenuComponent
    ],
    exports: [
        TaskComponent,
        UsernameMenuComponent
    ]
})

export class TaskModule {
}
