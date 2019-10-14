import {NgModule} from "@angular/core";
import {TaskComponent} from "./components/task.component";
import {UsernameMenuComponent} from "../../shared/components/username-menu.component";
import {CommonModule} from "@angular/common";


@NgModule({
    imports: [CommonModule],
    declarations: [TaskComponent, UsernameMenuComponent],
    exports: [TaskComponent, UsernameMenuComponent]
})

export class TaskModule {
}