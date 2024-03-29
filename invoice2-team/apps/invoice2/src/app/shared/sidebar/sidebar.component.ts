import { Component, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '@invoice2-team/users';

@Component({
    selector: 'invoice2-team-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements AfterViewInit {
    @ViewChild('drawer') drawer!: MatDrawer;

    constructor(private authService: AuthService) {}

    ngAfterViewInit(): void {
        if (window.matchMedia('(min-width: 980px)').matches) {
            this.toggleSidenav();
        }
    }

    onLogout() {
        this.authService.logout();
    }
    onClickHideSidebar() {
        if (window.matchMedia('(max-width: 980px)').matches) {
            this.toggleSidenav();
        }
    }

    toggleSidenav() {
        if (this.drawer) {
            this.drawer.toggle();
        }
    }
}
