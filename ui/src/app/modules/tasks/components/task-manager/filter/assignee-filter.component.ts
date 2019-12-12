import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from "@angular/material";
import {map, startWith} from "rxjs/operators";
import {EmployeeHttpService} from "../../../../employees/employee-http.service";
import {Employee} from "../../../../../shared/models/employee";

@Component({
    selector: 'assignee-filter-component',
    template: `
        <mat-form-field appearance="outline">
            <mat-label>Assignee</mat-label>
            <mat-chip-list #chipList aria-label="Selection">
                <mat-chip
                        *ngFor="let value of values"
                        [selectable]="selectable"
                        [removable]="removable"
                        (removed)="remove(value)">
                    {{value.name}} {{value.surname}}
                    <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
                </mat-chip>
                <input placeholder="Name Surname"
                       #valueInput
                       [formControl]="valueCtrl"
                       [matAutocomplete]="auto"
                       [matChipInputFor]="chipList"
                       [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                       [matChipInputAddOnBlur]="addOnBlur"
                       (matChipInputTokenEnd)="add($event)">
            </mat-chip-list>
            <mat-autocomplete #auto="matAutocomplete" (optionSelected)="selected($event)">
                <mat-option *ngFor="let value of filteredValues | async" [value]="value">
                    {{value.name}} {{value.surname}}
                </mat-option>
            </mat-autocomplete>
        </mat-form-field>
    `,
    styles: [`
        mat-form-field {
            width: 100%;
        }
    `]
})
export class AssigneeFilterComponent implements OnInit {
    private managerId: string = localStorage.getItem('uid');
    private allValues: Employee[] = [];
    private values: Employee[] = [];
    private filteredValues: Observable<Employee[]>;
    private valueCtrl = new FormControl();


    private selectable: boolean = true;
    private removable: boolean = true;
    private addOnBlur: boolean = true;
    private separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('valueInput', {static: false}) valueInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

    @Output() employees: EventEmitter<Employee[]> = new EventEmitter();

    constructor(private employeeHttpService: EmployeeHttpService) {
        this.filteredValues = this.valueCtrl.valueChanges.pipe(
            startWith(null),
            map((value: string | null) => this.checkIfIsString(value) ? this._filter(value) : this.allValues.slice()));
    }

    private checkIfIsString(value: any): boolean {
        return typeof value === 'string';
    }

    ngOnInit(): void {
        this.employeeHttpService.getEmployeesByManagerIdAsString(this.managerId)
            .subscribe((employees: Employee[]) => {
                this.allValues = employees;
            });
    }

    private _filter(value: string): Employee[] {
        const filterValue = value.toLowerCase();

        return this.allValues.filter(value => {
            return `${value.name} ${value.surname}`.toLowerCase().indexOf(filterValue) === 0;
        });
    }

    add(event: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            if ((value || '').trim()) {
                const filter = this.allValues.filter(employee => {
                    return `${employee.name} ${employee.surname}`.toLowerCase().indexOf(value.toLowerCase()) === 0;
                });

                if (filter.length > 0) {
                    this.values.push(filter[0]);
                    this.employees.emit(this.values);
                }
            }

            if (input) {
                input.value = '';
            }

            this.valueCtrl.setValue(null);
        }
    }

    remove(value: Employee) {
        const index = this.values.indexOf(value);

        if (index >= 0) {
            this.values.splice(index, 1);
            this.employees.emit(this.values);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const filterValue: string = event.option.viewValue;

        const filter = this.allValues.filter(value => {
            return `${value.name} ${value.surname}`
                .toLowerCase().indexOf(filterValue.toLowerCase()) === 0;
        });

        this.values.push(filter[0]);
        this.employees.emit(this.values);
        this.valueInput.nativeElement.value = '';
        this.valueCtrl.setValue(null);
    }
}
