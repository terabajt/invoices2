import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '@invoice2-team/users';

@Component({
    selector: 'invoice2-team-sidebar-top',
    templateUrl: './sidebar-top.component.html',
    styles: []
})
export class SidebarTopComponent {
    @Output() toggleSidenavEvent = new EventEmitter<void>();

    constructor(private usersService: UsersService) {}

    toggleSidenav() {
        this.toggleSidenavEvent.emit();
    }
}
