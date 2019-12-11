import {Injectable} from "@angular/core";
import {Task} from "../../shared/models/task";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Urls} from "../../shared/constants/urls";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {Page} from "../../shared/models/page";
import {Comment} from "../../shared/models/comment"
import {Errors} from "../../shared/constants/errors";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class CommentHttpService {

    private url: string = Urls.COMMENT;
    private errors = Errors;

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ){ }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            this.snackBar.open(error.error.toString(), "Close", {duration: 5000});
        } else if (error.status === 0) {
            this.snackBar.open(this.errors.CONNECTION_FAILED, "Close", {duration: 5000});
            console.log(error.message);
        } else {
            this.snackBar.open(error.error, "Close", {duration: 5000});
        }

        return throwError('Something bad happened; please try again later.');
    };

    findAllByTaskId(task: Task, page: Page) {
        let params = new HttpParams();
        params = params.set('page', page.number.toString());
        params = params.set('size', page.size.toString());

        const url: string = `${this.url}/tasks/${task.id}`;
        return this.http.get(url, {params})
            .pipe(map((response: any) => {
                    const page: Page = {
                        length: response.totalElements,
                        number: response.number,
                        size: response.size
                    };

                    return {
                        comments: response.content,
                        page: page,
                    }
                }),
                catchError((error) => this.handleError(error))
            );
    }

    save(comment: Comment) {
        return this.http.post<Comment>(this.url, comment)
            .pipe(
                catchError((error) => this.handleError(error))
            );
    }
}
