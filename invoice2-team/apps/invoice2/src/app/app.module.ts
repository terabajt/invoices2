import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule, appRoutes } from './app.routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { InvoicesListComponent } from './invoices/invoices-list/invoices-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InvoiceItemComponent } from './invoices/invoice-item/invoice-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { InvoicesModule } from '@invoice2-team/invoices';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DialogComponent } from './shared/dialog/dialog.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomerItemComponent } from './customers/customer-item/customer-item.component';
import { JwtInterceptor, UsersModule, UsersService } from '@invoice2-team/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserItemComponent } from './user/user-item/user-item.component';
import { PrintComponent } from './print/print/print.component';
import { InvoiceItemCopyComponent } from './invoices/invoice-item-copy/invoice-item-copy.component';
import { ButtonAddNewClientComponent } from './invoices/invoice-item/button-add-new-client/button-add-new-client.component';
import { SidebarTopComponent } from './shared/sidebar/sidebar-top/sidebar-top.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoggedUserInfoComponent } from '@invoice2-team/users';

const MAT_DIALOG_GLOBAL_CONFIG: MatDialogConfig = {
    width: '700px',
    disableClose: true,
    hasBackdrop: true
};

const MAT_SNACK_BAR_GLOBAL_CONFIG: MatSnackBarConfig = {
    duration: 2500,
    verticalPosition: 'top',
    horizontalPosition: 'center'
};

const MATERIAL_MODULE = [
    MatSlideToggleModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSidenavModule
];

registerLocaleData(localePl);

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ShellComponent,
        SidebarComponent,
        InvoicesListComponent,
        InvoiceItemComponent,
        DialogComponent,
        CustomersListComponent,
        CustomerItemComponent,
        UserItemComponent,
        PrintComponent,
        InvoiceItemCopyComponent,
        ButtonAddNewClientComponent,
        SidebarTopComponent,
        LoggedUserInfoComponent
    ],
    imports: [
        InvoicesModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        UsersModule,
        HttpClientModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        BrowserAnimationsModule,
        ...MATERIAL_MODULE,
        RouterModule,
        AppRoutingModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pl-PL' },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'PLN' },
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MAT_DIALOG_GLOBAL_CONFIG },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACK_BAR_GLOBAL_CONFIG },
        BreakpointObserver,
        UsersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
