import {Component, OnInit, ViewChild} from "@angular/core";
import {Manager} from "../../../../shared/models/manager";
import {ManagerHttpService} from "../../manager-http.service";
import {Router} from "@angular/router";
import {MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {Page} from "../../../../shared/models/page";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
    selector: "manager-list-component",
    template: `
        <button mat-raised-button class="manager-list__add-manager-button"
                color="primary"
                routerLink="form"
        >New Manager</button>
        
        <mat-card class="mat-elevation-z8 manager_list_content">
            <mat-card-title>Manager List</mat-card-title>
            <table mat-table 
                   [dataSource]="managerDataSource" 
                   matSort>
                <ng-container matColumnDef="select">
                    <th mat-header-cell *matHeaderCellDef>
                        <mat-checkbox (change)="$event ? masterToggle() : null"
                                      [checked]="selection.hasValue() && isAllSelected()"
                                      [indeterminate]="selection.hasValue() && !isAllSelected()"
                                      [aria-label]="checkboxLabel()">
                        </mat-checkbox>
                    </th>
                    <td mat-cell *matCellDef="let manager">
                        <mat-checkbox (click)="$event.stopPropagation()"
                                      (change)="$event ? this.selection.toggle(manager) : null"
                                      [checked]="selection.isSelected(manager)"
                                      [aria-label]="checkboxLabel(manager)">
                        </mat-checkbox>
                    </td>
                </ng-container>
                
                <ng-container matColumnDef="email">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
                    <td mat-cell *matCellDef="let manager">{{manager.email}}</td>
                </ng-container>
                <ng-container matColumnDef="surname">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Full Name</th>
                    <td mat-cell
                        *matCellDef="let manager"
                    >{{manager.name}} {{manager.surname}} {{manager.patronymic}}</td>
                </ng-container>
                <ng-container matColumnDef="birthDate">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Birth Date</th>
                    <td mat-cell *matCellDef="let manager">{{manager.birthDate}}</td>
                </ng-container>
                <ng-container matColumnDef="options">
                    <th mat-header-cell *matHeaderCellDef>Options</th>
                    <td mat-cell *matCellDef="let manager">
                        <button mat-button
                                class="manager-list__option-button"
                                color="accent"
                                (click)="onUpdate(manager)">
                            <mat-icon aria-label="Update icon">
                                update
                            </mat-icon>
                        </button>
                        <button mat-button
                                color="warn"
                                (click)="onDelete(manager)">
                            <mat-icon aria-label="Delete icon">
                                delete
                            </mat-icon>
                        </button>
                        <button mat-button
                                color="primary"
                                (click)="openProfile(manager)">
                            <mat-icon aria-label="Profile icon">
                                info
                            </mat-icon>
                        </button>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
                <tr mat-row *matRowDef="let row; columns: columnsToDisplay;"></tr>
            </table>
            <div class="manager_list__footer">
                <mat-paginator [length]="page.length" 
                               [pageSizeOptions]="[5, 10, 20]"
                               [pageSize]="page.size"
                               [pageIndex]="page.number"
                               (page)="onChangePage($event)"
                               showFirstLastButtons>
                </mat-paginator>
            </div>
        </mat-card>
    `,
    styleUrls: ['./manager-list.component.css']
})

export class ManagerListComponent implements OnInit{
    private columnsToDisplay = ['select', 'email', 'surname', 'birthDate', 'options'];

    private managerDataSource: MatTableDataSource<Manager> = new MatTableDataSource([]);
    private page: Page = {
        length: 0,
        size: 10,
        number: 0,
    } as Page;
    private managers: Manager[] = [];

    @ViewChild(MatSort, {static: true}) private sort: MatSort;
    private selection: SelectionModel<Manager> = new SelectionModel<Manager>(
        true,
        []
    );

    constructor(
        private managerHttpService: ManagerHttpService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.findAll(this.page);
    }

    findAll(page: Page) {
        this.managerHttpService
            .findAll(page)
            .subscribe((response: any) => {
                const managers = response.content;
                this.page = response.page;
                this.managerDataSource = new MatTableDataSource(managers);
                this.managerDataSource.sort = this.sort;
                this.selection.clear();
            })
    }

    onChangePage(pageEvent: PageEvent): void {
        const changedPage: Page = {
            length: null,
            size: pageEvent.pageSize,
            number: pageEvent.pageIndex,
        };

        this.findAll(changedPage);
    }

    onDelete(manager: Manager): void {
        this.managerHttpService
            .delete(manager)
            .subscribe(() => {
                let index = this.managers.indexOf(manager);
                if (index > -1) {
                    this.managers.splice(index, 1);
                }
            })
    }

    onUpdate(manager: Manager): void {
        this.router.navigate([`managers/${manager.id}`])
    }

    openProfile(manager: Manager): void {
        this.router.navigate([`managers/profile/${manager.id}`])
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.managerDataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.managerDataSource.data.forEach((row: any) => this.selection.select(row));
    }

    checkboxLabel(manager?: Manager): string {
        if (!manager) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }

        return `${this.selection.isSelected(manager) ? 'deselect' : 'select'} manager `;
    }
}
