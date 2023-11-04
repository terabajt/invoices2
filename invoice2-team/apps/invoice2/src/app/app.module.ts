import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
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

const MATERIAL_MODULE = [MatSlideToggleModule, MatIconModule, MatMenuModule, MatListModule, MatCardModule, MatButtonModule, MatTabsModule];

@NgModule({
    declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, InvoicesListComponent],
    imports: [BrowserModule, RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }), BrowserAnimationsModule, ...MATERIAL_MODULE],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
