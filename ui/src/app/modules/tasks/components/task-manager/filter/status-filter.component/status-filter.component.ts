import {Component, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";
import {TaskStatus} from "../../../../../../shared/models/task-status";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from "@angular/material";
import {map, startWith} from "rxjs/operators";

@Component({
    selector: 'status-filter-component',
    template: `                
        <mat-form-field appearance="outline" class="form-field-task-status">
            <mat-label>Status</mat-label>
            <mat-chip-list #statusChipList aria-label="Status selection">
                <mat-chip
                        *ngFor="let status of values"
                        [selectable]="selectable"
                        [removable]="removable"
                        (removed)="removeStatus(status)">
                    {{status}}
                    <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
                </mat-chip>
                <input placeholder="Status"
                       #statusInput
                       [formControl]="statusCtrl"
                       [matAutocomplete]="auto"
                       [matChipInputFor]="statusChipList"
                       [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                       [matChipInputAddOnBlur]="addOnBlur"
                       (matChipInputTokenEnd)="addStatus($event)">
            </mat-chip-list>
            <mat-autocomplete #auto="matAutocomplete" (optionSelected)="statusSelected($event)">
                <mat-option *ngFor="let status of filteredStatuses | async" [value]="status">
                    {{status}}
                </mat-option>
            </mat-autocomplete>
        </mat-form-field>
    `,
    styles: [`        
        .form-field-task-status {
            width: 100%;
        }
    `]
})
export class StatusFilterComponent {
    private allStatuses: TaskStatus[] = [
        TaskStatus.TODO,
        TaskStatus.INPROGRESS,
        TaskStatus.INREVIEW,
        TaskStatus.DONE
    ];
    private values: TaskStatus[] = [];
    private filteredStatuses: Observable<TaskStatus[]>;
    private statusCtrl = new FormControl();

    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('statusInput', {static: false}) statusInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

    @Output() statuses: EventEmitter<TaskStatus[]> = new EventEmitter();

    constructor() {
        this.filteredStatuses = this.statusCtrl.valueChanges.pipe(
            startWith(null),
            map((status: string | null) => status ? this._filterStatus(status) : this.allStatuses.slice()));
    }

    private _filterStatus(value: string): TaskStatus[] {
        const filterValue = value.toLowerCase();

        return this.allStatuses.filter(status => status.toLowerCase().indexOf(filterValue) === 0);
    }

    addStatus(event: MatChipInputEvent): void {
        if (this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;

            if ((value || '').trim()) {
                const filter = this.allStatuses
                    .filter(status => {
                        return status.toString().toLowerCase().indexOf(value.toLowerCase()) === 0;
                    });

                if (filter.length > 0) {
                    this.values.push(filter[0]);
                    this.statuses.emit(this.values);
                }
            }

            if (input) {
                input.value = '';
            }

            this.statusCtrl.setValue(null);
        }
    }

    removeStatus(status: TaskStatus) {
        const index = this.values.indexOf(status);

        if (index >= 0) {
            this.values.splice(index, 1);
            this.statuses.emit(this.values);
        }
    }

    statusSelected(event: MatAutocompleteSelectedEvent): void {
        const filterValue = event.option.viewValue;

        const filter = this.allStatuses
            .filter(value => {
                return value.toLowerCase().indexOf(filterValue.toLowerCase()) === 0;
            });

        this.values.push(filter[0]);
        this.statusInput.nativeElement.value = '';
        this.statusCtrl.setValue(null);
        this.statuses.emit(this.values);
    }
}
