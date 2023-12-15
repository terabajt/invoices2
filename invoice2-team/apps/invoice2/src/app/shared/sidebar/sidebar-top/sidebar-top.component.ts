import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, UsersService } from '@invoice2-team/users';
import { take } from 'rxjs';

@Component({
    selector: 'invoice2-team-sidebar-top',
    templateUrl: './sidebar-top.component.html',
    styles: []
})
export class SidebarTopComponent implements AfterViewInit {
    @Output() toggleSidenavEvent = new EventEmitter<void>();

    user!: User;

    constructor(private usersService: UsersService) {}

    ngAfterViewInit(): void {
        this._getLoggedUser();
    }

    private _getLoggedUser() {
        this.usersService
            .observeCurrentUser()
            .pipe(take(1))
            .subscribe((user) => {
                if (user) this.user = user;
            });
    }

    toggleSidenav() {
        this.toggleSidenavEvent.emit();
    }
}
