import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ManagerHttpService} from "../../../managers/manager-http.service";
import {Manager} from "../../../../shared/models/manager";
import {Page} from "../../../../shared/models/page";
import {PageEvent} from "@angular/material";

@Component({
    selector: 'manager-selection-component',
    template: `
        <mat-card-title>Managers</mat-card-title>
        <mat-card-content>
            <mat-selection-list>
                <mat-list-option *ngFor="let manager of managers" (click)="onSelect(manager)">
                    {{manager | fullName}}
                </mat-list-option>
            </mat-selection-list>
        </mat-card-content>
        <div class="manager-list__footer">
            <button mat-stroked-button
                    (click)="back()"
                    color="primary"
            >Cancel</button>
            <mat-paginator [length]="page.length"
                           [pageSizeOptions]="[5, 10, 20]"
                           [pageSize]="page.size"
                           [pageIndex]="page.number"
                           (page)="onChangePage($event)"
                           showFirstLastButtons>
            </mat-paginator>
        </div>
        <mat-progress-bar mode="indeterminate" *ngIf="sending"></mat-progress-bar>
    `,
    styleUrls: ['./manager-selection.component.css'],
    providers: [ManagerHttpService]
})
export class ManagerSelectionComponent implements OnInit{
    private managers: Manager[] = [];
    private page: Page = {
        length: 0,
        size: 10,
        number: 0,
    } as Page;
    private sending = true;

    @Output() manager: EventEmitter<Manager> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    constructor(
        private managerHttpService: ManagerHttpService,
    ) {}

    ngOnInit(): void {
        this.findAll(this.page);
    }

    findAll(page: Page) {
        this.sending = true;
        this.managerHttpService
            .findAll(page)
            .subscribe(
                (response: any) => {
                    this.sending = false;
                    this.managers = response.content;
                    this.page = response.page;
                },
                () => this.sending = false)
    }

    onChangePage(pageEvent: PageEvent): void {
        const changedPage: Page = {
            length: null,
            size: pageEvent.pageSize,
            number: pageEvent.pageIndex,
        };

        this.findAll(changedPage);
    }

    back() {
        this.cancel.emit();
    }

    onSelect(manager: Manager) {
        this.manager.emit(manager);
    }
}
