import {NgModule} from "@angular/core";
import {AboutComponent} from "./components/about.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AboutComponent
    ],
    exports: [
        AboutComponent
    ]
})

export class AboutModule {

}



