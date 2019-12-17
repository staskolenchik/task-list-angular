import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatDatepicker} from "@angular/material";

@Component({
    selector: 'date-filter-component',
    template: `
        <mat-form-field appearance="outline" class="date">
            <mat-label>{{labelName}}</mat-label>
            <input matInput 
                   class="date__input"
                   readonly
                   name="date"
                   [matDatepicker]="picker" 
                   placeholder="dd/mm/yyyy"
                   #date
                   (dateChange)="transferDate($event.value)"
                   (click)="picker.open()">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker touchUi #picker></mat-datepicker>
            <mat-hint class="date__clear-hint" *ngIf="date.value" (click)="clear(date, picker)">Click to clear</mat-hint>
        </mat-form-field>
    `,
    styles: [`
        .date {
            width: 100%;
        }

        .date__input,
        .date__clear-hint {
            cursor: pointer;            
        }
        
        .date__clear-hint {
            color: #673AB7;
        }
    `]
})
export class DateFilterComponent {
    @Input() private labelName: string = '';
    @Output() private data: EventEmitter<Date> = new EventEmitter();

    transferDate(date: Date) {
        this.data.emit(date);
    }

    clear(date: HTMLInputElement, picker: MatDatepicker<Date>) {
        date.value = '';
        picker.select(null);
    }
}
