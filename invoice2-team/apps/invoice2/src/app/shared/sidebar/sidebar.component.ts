import { Component } from '@angular/core';
import { AuthService } from '@invoice2-team/users';

@Component({
    selector: 'invoice2-team-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent {
    constructor(private authService: AuthService) {}
    onLogout() {
        this.authService.logout();
    }
}
