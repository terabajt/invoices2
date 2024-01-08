import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { ActivationComponent } from './pages/activation/activation.component';

export const usersRoutes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'activation/:token',
        component: ActivationComponent
    }
];
