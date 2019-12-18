import {Component} from "@angular/core";

@Component({
    selector: 'page-not-found-component',
    template: `
        <mat-card class="forbidden-card">
            <mat-card-title class="forbidden-card__title">Page Not Found</mat-card-title>
        </mat-card>
    `,
    styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

}
