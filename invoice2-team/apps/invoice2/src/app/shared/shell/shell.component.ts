import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'invoice2-team-shell',
    templateUrl: './shell.component.html',
    styles: []
})
export class ShellComponent {
    @ViewChild('drawer') drawer!: MatDrawer;

    toggleSidenav() {
        if (this.drawer) {
            this.drawer.toggle();
        }
    }
}
