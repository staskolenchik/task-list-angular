import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ManagerComponent} from "./components/manager.component";
import {ManagerAddFormComponent} from "./components/manager-add-form/manager-add-form.component";
import {ManagerListComponent} from "./components/manager-list/manager-list.component";
import {ManagerProfileComponent} from "./components/manager-profile/manager-profile.component";
import {ManagerUpdateFormComponent} from "./components/manager-update-form/manager-update-form.component";

const managerRoutes: Routes = [
    {
        path: '',
        component: ManagerComponent,
        children: [
            {
                path: '',
                component: ManagerListComponent,
            },
            {
                path: 'form',
                component: ManagerAddFormComponent,
            },
            {
                path: ':id',
                component: ManagerUpdateFormComponent,
            },
            {
                path: 'profile/:id',
                component: ManagerProfileComponent,
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(managerRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ManagerRoutingModule {

}
