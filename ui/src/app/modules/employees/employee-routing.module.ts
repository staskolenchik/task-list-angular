import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EmployeeComponent} from "./components/employee.component";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {EmployeeFormComponent} from "./components/employee-form/employee-form.component";
import {EmployeeUpdateFormComponent} from "./components/employee-update-form/employee-update-form.component";
import {EmployeeProfileComponent} from "./components/employee-profile/employee-profile.component";

const employeeRoutes: Routes = [
    {
        path: '',
        component: EmployeeComponent,
        children: [
            {
                path: '',
                component: EmployeeListComponent,
            },
            {
                path: 'form',
                component: EmployeeFormComponent,
            },
            {
                path: ':id',
                component: EmployeeUpdateFormComponent,
            },
            {
                path: 'profile/:id',
                component: EmployeeProfileComponent,
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(employeeRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class EmployeeRoutingModule {
}
