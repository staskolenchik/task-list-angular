import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TaskRoutingModule} from "./task-routing.module";
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatDialogModule,
    MatGridListModule, MatIconModule,
    MatInputModule, MatPaginatorModule,
    MatRadioModule,
    MatSelectModule, MatSortModule,
    MatTableModule, MatToolbarModule,
    MatProgressBarModule
} from "@angular/material";
import {TaskFormComponent} from "./components/task-form/task-form.component";
import {TaskListEmployeeComponent} from "./components/task-list-employee/task-list-employee.component";
import {TaskListEmployeeTableComponent} from "./components/task-list-employee/table/task-list-employee-table.component";
import {TaskListManagerComponent} from "./components/task-list-manager/task-list-manager.component";
import {TaskListManagerTableComponent} from "./components/task-list-manager/table/task-list-manager-table.component";
import {TaskDataService} from "./task-data.service";
import {TaskHttpService} from "./task-http.service";
import {TaskInfoComponent} from "./components/task-info/task-info.component";
import {RouterModule} from "@angular/router";
import {DeletePermissionComponent} from "../../shared/modal-dialogs/delete-permission/delete-permission.component";
import {DeleteAllPermissionComponent} from "../../shared/modal-dialogs/delete-all-permission/delete-all-permission.component";


@NgModule({
    declarations: [
        TaskFormComponent,
        TaskListEmployeeComponent,
        TaskListEmployeeTableComponent,
        TaskListManagerComponent,
        TaskListManagerTableComponent,
        TaskInfoComponent,
        DeletePermissionComponent,
        DeleteAllPermissionComponent
    ],
    imports: [
        RouterModule,
        TaskRoutingModule,
        CommonModule,
        FormsModule,
        MatGridListModule,
        MatCardModule,
        MatTableModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSortModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatProgressBarModule
    ],
    exports: [
        TaskFormComponent,
        TaskListEmployeeComponent,
        TaskListEmployeeTableComponent,
        TaskListManagerComponent,
        TaskListManagerTableComponent,
        TaskInfoComponent,
        DeletePermissionComponent,
        DeleteAllPermissionComponent
    ],
    entryComponents: [
        DeletePermissionComponent,
        DeleteAllPermissionComponent
    ],
    providers: [
        TaskDataService,
        TaskHttpService
    ]
})

export class TaskModule {
}
