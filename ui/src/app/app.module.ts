import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {TaskModule} from "./modules/tasks/task.module";
import {EmployeeModule} from "./modules/employees/employee.module";
import {ManagerModule} from "./modules/managers/manager.module";
import {AppRoutingModule} from "./app-routing.module";
import {AboutModule} from "./modules/about/about.module";

import {
    MAT_DATE_LOCALE,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule, MatSortModule,
    MatStepperModule, MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
} from "@angular/material";

import {ScrollingModule} from "@angular/cdk/scrolling";
import {PortalModule} from "@angular/cdk/portal";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {A11yModule} from "@angular/cdk/a11y";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {CdkTableModule} from "@angular/cdk/table";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CdkTreeModule} from "@angular/cdk/tree";
import {LoginComponent} from "./pages/login/login.component";
import {ForbiddenComponent} from "./pages/forbidden/forbidden.component";
import {HTTP_INTERCEPTOR_PROVIDERS} from "./http-interceptors";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

@NgModule({
    imports:[
        AppRoutingModule,
        AboutModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TaskModule,
        EmployeeModule,
        ManagerModule,

        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,
        A11yModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        ForbiddenComponent,
        PageNotFoundComponent,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        HTTP_INTERCEPTOR_PROVIDERS,
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'en-GB'
        },
    ],
})

export class AppModule{}
