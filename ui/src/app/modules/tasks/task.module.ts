import {NgModule} from "@angular/core";
import {TaskComponent} from "./components/task.component";
import {UsernameMenuComponent} from "../../shared/components/username-menu.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TaskComponent, UsernameMenuComponent],
    exports: [TaskComponent, UsernameMenuComponent]
})

export class TaskModule {
}