import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.services';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private localStorageToken: LocalstorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('AuthGuard canActivate called:', { route, state });

        const token = this.localStorageToken.getToken();
        console.log('Token:', token);

        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            console.log('Token Decode:', tokenDecode);

            //isAdmin check
            if (tokenDecode.isAdmin && this._tokenExpired(tokenDecode.exp)) {
                console.log('User is Admin and token is not expired.');
                return true;
            }

            //user check
            if (this._tokenExpired(tokenDecode.exp)) {
                console.log('User token is not expired.');
                return true;
            }
        }

        console.log('Redirecting to /login.');
        this.router.navigate(['/login']);
        return false;
    }
    private _tokenExpired(expiration: number): boolean {
        return Math.floor(new Date().getTime() / 1000) <= expiration;
    }
}
