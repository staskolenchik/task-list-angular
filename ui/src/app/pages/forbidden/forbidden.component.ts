import {Component} from "@angular/core";

@Component({
    selector: 'forbidden-component',
    template: `
        <mat-card class="forbidden-card">
            <mat-card-title class="forbidden-card__title">403 Access not allowed</mat-card-title>
        </mat-card>
    `,
    styleUrls: [`./forbidden.component.css`]
})
export class ForbiddenComponent {

}
