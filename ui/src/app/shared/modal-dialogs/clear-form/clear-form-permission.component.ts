import {Component} from "@angular/core";

@Component({
    selector: 'clear-form-permission-component',
    template: `
        <div class="clear-permission">
            <h2 mat-dialog-title class="clear-permission__title">Please, confirm reset form operation</h2>
            <mat-dialog-content class="clear-permission__content">
                <div>You are going to <b>clean up the whole form</b>.</div>
                <div>Are you sure?</div>
            </mat-dialog-content>
            <mat-dialog-actions class="clear-permission__actions">
                <button mat-button mat-dialog-close>No</button>
                <button mat-raised-button color="warn" [mat-dialog-close]="true">Yes</button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .clear-permission {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .clear-permission__content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    `]
})
export class ClearFormPermissionComponent {

    constructor() {}
}
