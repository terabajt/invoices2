import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarModule } from '@coreui/angular';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, SidebarModule, NgScrollbarModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
