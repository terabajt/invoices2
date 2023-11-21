import { Component, OnInit } from '@angular/core';
import { UsersService } from '@invoice2-team/users';

@Component({
    selector: 'invoice2-team-root',
    templateUrl: './app.component.html',
    styles: ['']
})
export class AppComponent implements OnInit {
    constructor(private usersServices: UsersService) {}
    title = 'apps/invoice2';

    ngOnInit(): void {
        this.usersServices.initAppSession();
    }
}
