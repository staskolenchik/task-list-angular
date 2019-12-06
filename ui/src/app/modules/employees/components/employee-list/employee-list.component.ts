import {Component, OnInit, ViewChild} from "@angular/core";
import {Employee} from "../../../../shared/models/employee";
import {MatDialog, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {Page} from "../../../../shared/models/page";
import {SelectionModel} from "@angular/cdk/collections";
import {Router} from "@angular/router";
import {DeleteAllPermissionComponent} from "../../../../shared/modal-dialogs/delete-all-permission/delete-all-permission.component";
import {DeletePermissionComponent} from "../../../../shared/modal-dialogs/delete-permission/delete-permission.component";
import {EmployeeHttpService} from "../../employee-http.service";

@Component({
    selector: 'employee-list-component',
    template: `
        <button mat-raised-button class="employee-list__add-employee-button"
                color="primary"
                routerLink="form"
        >New Employee</button>

        <mat-card class="mat-elevation-z8 employee_list_content">
            <mat-card-title>Employee List</mat-card-title>
            <table mat-table [dataSource]="employeeDataSource" matSort>
                <ng-container matColumnDef="select">
                    <th mat-header-cell *matHeaderCellDef>
                        <mat-checkbox (change)="$event ? masterToggle() : null"
                                      [checked]="selection.hasValue() && isAllSelected()"
                                      [indeterminate]="selection.hasValue() && !isAllSelected()"
                                      [aria-label]="checkboxLabel()">
                        </mat-checkbox>
                    </th>
                    <td mat-cell *matCellDef="let employee">
                        <mat-checkbox (click)="$event.stopPropagation()"
                                      (change)="$event ? this.selection.toggle(employee) : null"
                                      [checked]="selection.isSelected(employee)"
                                      [aria-label]="checkboxLabel(employee)">
                        </mat-checkbox>
                    </td>
                </ng-container>

                <ng-container matColumnDef="email">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
                    <td mat-cell *matCellDef="let employee">{{employee.email}}</td>
                </ng-container>
                <ng-container matColumnDef="surname">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Full Name</th>
                    <td mat-cell
                        *matCellDef="let employee"
                    >{{employee | fullName: true}}</td>
                </ng-container>
                <ng-container matColumnDef="birthDate">
                    <th mat-header-cell *matHeaderCellDef mat-sort-header>Birth Date</th>
                    <td mat-cell *matCellDef="let employee">{{employee.birthDate | date:"dd/MM/yyyy"}}</td>
                </ng-container>
                <ng-container matColumnDef="options">
                    <th mat-header-cell *matHeaderCellDef>Update / Delete / Profile</th>
                    <td mat-cell *matCellDef="let employee">
                        <button mat-button
                                class="employee-list__option-button"
                                color="accent"
                                (click)="onUpdate(employee)">
                            <mat-icon aria-label="Update icon">
                                update
                            </mat-icon>
                        </button>
                        <button mat-button
                                color="warn"
                                (click)="askDeletePermission(employee)">
                            <mat-icon aria-label="Delete icon">
                                delete
                            </mat-icon>
                        </button>
                        <button mat-button
                                color="primary"
                                (click)="openProfile(employee)">
                            <mat-icon aria-label="Profile icon">
                                info
                            </mat-icon>
                        </button>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
                <tr mat-row *matRowDef="let row; columns: columnsToDisplay;"></tr>
            </table>
            <div class="employee-list__footer">
                <button mat-raised-button
                        [disabled]="selection.isEmpty()"
                        (click)="askDeleteAllPermission()"
                        color="warn"
                >Delete selected</button>
                <mat-paginator [length]="page.length"
                               [pageSizeOptions]="[5, 10, 20]"
                               [pageSize]="page.size"
                               [pageIndex]="page.number"
                               (page)="onChangePage($event)"
                               showFirstLastButtons>
                </mat-paginator>
            </div>
            <mat-progress-bar mode="indeterminate" *ngIf="sending"></mat-progress-bar>
        </mat-card>
    `,
    styleUrls: ['./employee-list.component.css'],
})

export class EmployeeListComponent implements OnInit{
    private columnsToDisplay = ['select', 'email', 'surname', 'birthDate', 'options'];
    private sending: boolean = false;
    private employeeDataSource: MatTableDataSource<Employee> = new MatTableDataSource([]);
    private page: Page = {
        length: 0,
        size: 10,
        number: 0,
    } as Page;

    @ViewChild(MatSort, {static: true}) private sort: MatSort;
    private selection: SelectionModel<Employee> = new SelectionModel<Employee>(
        true,
        []
    );

    constructor(
        private employeeHttpService: EmployeeHttpService,
        private router: Router,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadManagersFromStartPage();
    }

    findAll(page: Page) {
        this.employeeHttpService
            .findAll(page)
            .subscribe(
                (response: any) => {
                    this.sending = false;
                    const managers = response.content;
                    this.page = response.page;
                    this.employeeDataSource = new MatTableDataSource(managers);
                    this.employeeDataSource.sort = this.sort;
                    this.selection.clear();
                },
                () => this.sending = false
            )
    }

    onChangePage(pageEvent: PageEvent): void {
        this.sending = true;
        const changedPage: Page = {
            length: null,
            size: pageEvent.pageSize,
            number: pageEvent.pageIndex,
        };

        this.findAll(changedPage);
    }

    onDelete(employee: Employee): void {
        this.sending = true;
        this.employeeHttpService
            .delete(employee)
            .subscribe(
                () => {
                    this.loadManagersFromStartPage();
                },
                () => this.sending = false
            );
    }

    onUpdate(employee: Employee): void {
        this.router.navigate([`employees/${employee.id}`])
    }

    openProfile(employee: Employee): void {
        this.router.navigate([`employees/profile/${employee.id}`])
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.employeeDataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.employeeDataSource.data.forEach((row: any) => this.selection.select(row));
    }

    checkboxLabel(employee?: Employee): string {
        if (!employee) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }

        return `${this.selection.isSelected(employee) ? 'deselect' : 'select'} employee `;
    }

    askDeleteAllPermission() {
        const matDialogRef = this.dialog.open(DeleteAllPermissionComponent, {
            height: '210px',
            width: '480px',
            data: {count: this.selection.selected.length}
        });

        matDialogRef.afterClosed().subscribe(isApproved => {
            if (isApproved) {
                this.onDeleteAll(this.selection.selected);
            } else {
                this.selection.clear();
            }
        })
    }

    askDeletePermission(employee: Employee) {
        const matDialogRef = this.dialog.open(DeletePermissionComponent, {
            height: '210px',
            width: '480px',
            data: {item: `${employee.name} ${employee.surname}`}
        });

        matDialogRef.afterClosed().subscribe(isApproved => {
            if (isApproved) {
                this.onDelete(employee);
            }
        })
    }

    private onDeleteAll(employees: Employee[]) {
        this.sending = true;

        this.employeeHttpService
            .deleteAll(employees)
            .subscribe(
                () => {
                    this.loadManagersFromStartPage();
                },
                () => this.sending = false
            );
    }

    loadManagersFromStartPage(): void {
        this.sending = true;
        this.page.number = 0;
        this.findAll(this.page);
    }
}
