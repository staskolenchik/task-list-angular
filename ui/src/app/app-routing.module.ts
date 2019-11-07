import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./modules/about/components/about.component";

const appRoutes: Routes = [
    {path: '', component: AboutComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true}
        )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
