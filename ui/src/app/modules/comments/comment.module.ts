import {NgModule} from "@angular/core";
import {CommentComponent} from "./comment.component";
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule, MatPaginatorModule,
    MatSelectModule
} from "@angular/material";
import {CommentFormComponent} from "./components/comment-form.component";
import {CommentListComponent} from "./components/comment-list.component";
import {CommentHttpService} from "./comment-http.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ApplicationPipesModule} from "../../pipes/application-pipes.module";

@NgModule({
    declarations: [
        CommentComponent,
        CommentFormComponent,
        CommentListComponent,
    ],
    imports: [
        MatCardModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        CommonModule,
        FormsModule,
        MatListModule,
        MatIconModule,
        ApplicationPipesModule,
        MatPaginatorModule,
    ],
    exports: [
        CommentComponent,
        CommentFormComponent,
        CommentListComponent,
    ],
    providers: [
        CommentHttpService,
    ]
})
export class CommentModule {

}
