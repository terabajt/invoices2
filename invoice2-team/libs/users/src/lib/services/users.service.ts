import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';
// import * as countriesLib from 'i18n-iso-countries';
// declare const require: (arg0: string) => countriesLib.LocaleData;
import { environment } from '../../../../../environments/environment.development';
import { UsersFacade } from '../state/users.facade';
// import { UsersFacade } from '../state/users.facade';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    initAppSession() {
        this.usersFacade.buildUserSession();
    }
    apiURLUsers = environment.apiURL + 'users';
    constructor(private usersFacade: UsersFacade, private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiURLUsers}`);
    }
    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
    }
    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiURLUsers}`, user);
    }
    deleteUser(userId: string) {
        return this.http.delete(`${this.apiURLUsers}/${userId}`);
    }
    updateUser(user: User) {
        return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
    }

    getUsersCount(): Observable<number> {
        return this.http.get<number>(`${this.apiURLUsers}/get/count`).pipe(map((res: any) => res.userCount));
    }
    observeCurrentUser() {
        return this.usersFacade.currentUser$;
    }

    isCurrentUserAuth() {
        return this.usersFacade.isAuthenticated$;
    }
}
