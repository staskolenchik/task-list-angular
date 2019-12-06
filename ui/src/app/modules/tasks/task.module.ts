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
    MatProgressBarModule, MatExpansionModule, MatTabsModule
} from "@angular/material";
import {TaskFormComponent} from "./components/task-manager/task-form/task-form.component";
import {TaskEmployeeComponent} from "./components/task-employee/task-employee.component";
import {TodoInprogressTaskListTableComponent} from "./components/task-employee/table/todo-inprogress-task-list-table.component";
import {TaskManagerComponent} from "./components/task-manager/task-manager.component";
import {InReviewTaskListTableComponent} from "./components/task-manager/in-review-task-list-table/in-review-task-list-table.component";
import {TaskDataService} from "./task-data.service";
import {TaskHttpService} from "./task-http.service";
import {TaskInfoComponent} from "./components/task-info/task-info.component";
import {RouterModule} from "@angular/router";
import {DeletePermissionComponent} from "../../shared/modal-dialogs/delete-permission/delete-permission.component";
import {DeleteAllPermissionComponent} from "../../shared/modal-dialogs/delete-all-permission/delete-all-permission.component";
import {AllTaskListTableComponent} from "./components/task-manager/all-task-list-table/all-task-list-table.component";


@NgModule({
    declarations: [
        TaskFormComponent,
        TaskEmployeeComponent,
        TodoInprogressTaskListTableComponent,
        TaskManagerComponent,
        InReviewTaskListTableComponent,
        TaskInfoComponent,
        AllTaskListTableComponent,
        DeletePermissionComponent,
        DeleteAllPermissionComponent,
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
        MatProgressBarModule,
        MatExpansionModule,
        MatTabsModule
    ],
    exports: [
        TaskFormComponent,
        TaskEmployeeComponent,
        TodoInprogressTaskListTableComponent,
        TaskManagerComponent,
        InReviewTaskListTableComponent,
        TaskInfoComponent,
        AllTaskListTableComponent,
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
