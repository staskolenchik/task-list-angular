import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./modules/about/components/about.component";
import {LoginComponent} from "./pages/login/login.component";
import {ForbiddenComponent} from "./pages/forbidden/forbidden.component";

const appRoutes: Routes = [
    {path: '', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forbidden', component: ForbiddenComponent},
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
