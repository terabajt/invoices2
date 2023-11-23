import { Component, OnInit } from '@angular/core';
import { UsersService } from '@invoice2-team/users';

@Component({
    selector: 'invoice2-team-dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {
    constructor(private usersService: UsersService) {}
    items = [
        { title: 'Aplikacja do wystawiania faktur', data: 'Data: 03.11.2023', content: ' Nowy regulamin dostępny jest na stronie: <a href="#">REGULAMIN</a>' },
        { title: 'Nowa wersja', data: 'Data: 04.11.2023', content: ' Zaktualizowaliśmy aplikację. Zobacz listę zmian: <a href="#">Zmiany v2</a>' }
    ];

    ngOnInit(): void {
        this.usersService.observeCurrentUser();
    }
}
