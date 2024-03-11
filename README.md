# invoices2
A better version full stack app MEAN of the invoicing application.

# Assumptions
The application is used to issue invoices online. 

# Server run:

Before run server please add your server/.env file like: <br />
`API_URL = ''` <br />
`CONNECTION_STRING = '' ` <br />
`PORT = '' `<br />
`SECRET = ''`


## Application architecture
![Database schema](https://github.com/terabajt/invoices2/blob/main/Efaktury24.database.png)


## Project Repository
![Repository schema](https://github.com/terabajt/invoices2/blob/main/ProjectRepository.png)

# API Documentation

This API provides endpoints for managing users, customers, invoices, and activation.<br />

## Users <br />
Get User by ID <br />
`GET /api/v1/users/:id`<br />
Retrieve user details by providing the user ID.<br />

Register User<br />
`POST /api/v1/users/register`<br />
Register a new user with email, password, and other details.<br />

Login User<br />
`POST /api/v1/users/login`<br />
Authenticate a user by email and password.<br />

Update User<br />
`PUT /api/v1/users/:id`<br />
Update user details by providing the user ID.<br />

Delete User<br />
`DELETE /api/v1/users/:id`<br />
Delete a user by providing the user ID.<br />

Activation<br />
Activate User<br />
`GET /api/v1/activation?token=<activationToken>`<br />
Activate a user account by providing the activation token.<br />

## Customers
Get Customer by ID<br />
`GET /api/v1/customers/:id`<br />
Retrieve customer details by providing the customer ID.<br />

Get Customers for User<br />
`GET /api/v1/customers/foruser/:userId`<br />
Retrieve all customers associated with a specific user.<br />

Create Customer<br />
`POST /api/v1/customers/`
Create a new customer.<br />

Update Customer<br />
`PUT /api/v1/customers/:id`<br />
Update customer details by providing the customer ID.<br />

Delete Customer<br />
`DELETE /api/v1/customers/:id`<br />
Delete a customer by providing the customer ID.<br />

## Invoices
Get Invoice by ID<br />
`GET /api/v1/invoices/:id`<br />
Retrieve invoice details by providing the invoice ID.<br />

Get Invoices for User<br />
`GET /api/v1/invoices/foruser/:userID`<br />
Retrieve all invoices associated with a specific user.<br />

Create Invoice<br />
`POST /api/v1/invoices/`<br />
Create a new invoice.<br />

Update Invoice<br />
`PUT /api/v1/invoices/:id`<br />
Update invoice details by providing the invoice ID.<br />

Delete Invoice<br />
`DELETE /api/v1/invoices/:id`<br />
Delete an invoice by providing the invoice ID.<br />

## Get Number of Invoices<br />
`GET /api/v1/invoices/get/invoicesNumber`
Get the total number of invoices.<br />

## Entry Item Operations<br />
`POST /api/v1/invoices/entryitem`<br />
`PUT /api/v1/invoices/entryitem/:id`<br />
`DELETE /api/v1/invoices/entryitem/:id`<br />
Perform operations (create, update, delete) on entry items associated with invoices.<br />

## Statistics<br />

`GET /api/v1/invoices/statistics/:userID`<br />
Retrieve statistics for invoices associated with a specific user.<br />

## This documentation provides an overview of the available endpoints and their functionalities. Make sure to include appropriate request payloads and handle responses accordingly.


# Authorization Documentation

This document provides an overview of the authorization mechanism implemented in the application, as well as details about the store used for managing user sessions.

## Authorization

The authorization mechanism is implemented using JSON Web Tokens (JWT) and the `express-jwt` middleware in the backend, and Angular route guards in the frontend.

### Backend Authorization

In the backend, the `authJwt()` function is used to generate middleware for authenticating HTTP requests. This middleware checks for a valid JWT in the Authorization header of incoming requests. The JWT secret is fetched from the environment variables, and the algorithm used for signing the tokens is HS256.

```javascript
const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET;
    const api = process.env.API_URL;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            `${api}/users/login`,
            `${api}/users/register`,
            /\/activation\/*/,
        ],
    });
}

module.exports = authJwt;
```

### Frontend Authorization

In the frontend, Angular route guards are utilized to secure routes based on the user's authentication status. The `AuthGuard` class implements the `CanActivate` interface to manage access to routes. It verifies the presence of a valid JWT token in the local storage and checks the user's authentication status before granting access to protected routes.

```typescript
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private localStorageToken: LocalstorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token = this.localStorageToken.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            //isAdmin check
            if (tokenDecode.isAdmin && this._tokenExpired(tokenDecode.exp)) {
                return true;
            }

            //user check
            if (this._tokenExpired(tokenDecode.exp)) {
                return true;
            }
        }

        this.router.navigate(['/login']);
        return false;
    }
    private _tokenExpired(expiration: number): boolean {
        return Math.floor(new Date().getTime() / 1000) <= expiration;
    }
}
```
## Store

The store manages user sessions and authentication status in the frontend using NgRx, a reactive state management library for Angular applications.

```typescript
import { Injectable } from '@angular/core';
import { createReducer, on, Action } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { User } from '../models/user';

export const USERS_FEATURE_KEY = 'users';
export interface UsersState {
    user: User | null;
    isAuthenticated: boolean;
}
export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState;
}
export const initialUsersState: UsersState = {
    user: null,
    isAuthenticated: false
};
const usersReducer = createReducer(
    initialUsersState,
    on(UsersActions.buildUserSession, (state) => ({ ...state })),
    on(UsersActions.buildUserSessionSuccess, (state, action) => ({ ...state, user: action.user, isAuthenticated: true })),
    on(UsersActions.buildUserSessionFailed, (state) => ({ ...state, user: null, isAuthenticated: false }))
);
export function reducer(state: UsersState | undefined, action: Action) {
    return usersReducer(state, action);
}
```



