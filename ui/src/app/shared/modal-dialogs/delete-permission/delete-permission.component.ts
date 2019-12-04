import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: 'delete-permission-component',
    template: `
        <div class="delete-permission">
            <h2 mat-dialog-title class="delete-permission__title">Please, confirm delete operation</h2>
            <mat-dialog-content class="delete-permission__content">
                <div>You are going to delete <b>{{data.item}}</b>.</div>
                <div>Are you sure?</div>
            </mat-dialog-content>
            <mat-dialog-actions class="delete-permission__actions">
                <button mat-button mat-dialog-close>No</button>
                <button mat-raised-button color="warn" [mat-dialog-close]="true">Yes</button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [`
        .delete-permission {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    `]
})
export class DeletePermissionComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
}
