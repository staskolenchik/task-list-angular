import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TaskRoutingModule} from "./task-routing.module";
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule
} from "@angular/material";
import {TaskFormComponent} from "./components/task-manager/task-form/task-form.component";
import {TaskEmployeeComponent} from "./components/task-employee/task-employee.component";
import {TodoInprogressTaskListTableComponent} from "./components/task-employee/table/todo-inprogress-task-list-table.component";
import {TaskManagerComponent} from "./components/task-manager/task-manager.component";
import {InReviewTaskListTableComponent} from "./components/task-manager/in-review-task-list-table/in-review-task-list-table.component";
import {TaskHttpService} from "./task-http.service";
import {TaskInfoComponent} from "./components/task-info/task-info.component";
import {RouterModule} from "@angular/router";
import {DeletePermissionComponent} from "../../shared/modal-dialogs/delete-permission/delete-permission.component";
import {DeleteAllPermissionComponent} from "../../shared/modal-dialogs/delete-all-permission/delete-all-permission.component";
import {AllTaskListTableComponent} from "./components/task-manager/all-task-list-table/all-task-list-table.component";
import {ApplicationPipesModule} from "../../pipes/application-pipes.module";
import {FilterComponent} from "./components/task-manager/filter/filter.component";
import {StatusFilterComponent} from "./components/task-manager/filter/status-filter.component";
import {AssigneeFilterComponent} from "./components/task-manager/filter/assignee-filter.component";
import {CommentModule} from "../comments/comment.module";

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
        FilterComponent,
        StatusFilterComponent,
        AssigneeFilterComponent,
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
        MatTabsModule,
        MatListModule,
        ApplicationPipesModule,
        MatChipsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        CommentModule,
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
        DeleteAllPermissionComponent,
        FilterComponent,
        AssigneeFilterComponent,
    ],
    entryComponents: [
        DeletePermissionComponent,
        DeleteAllPermissionComponent
    ],
    providers: [
        TaskHttpService
    ]
})

export class TaskModule {
}
