import { Component } from '@angular/core';
import { navItems } from './_nav';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent {
    public navItems = navItems;
}
