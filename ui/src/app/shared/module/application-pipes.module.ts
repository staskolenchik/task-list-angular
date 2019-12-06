import {NgModule} from "@angular/core";
import {FullNamePipe} from "../../pipes/full-name.pipe";

@NgModule({
    imports: [],
    declarations: [
        FullNamePipe,
    ],
    exports: [
        FullNamePipe,
    ]
})
export class ApplicationPipesModule {}
