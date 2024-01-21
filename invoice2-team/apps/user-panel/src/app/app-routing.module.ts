import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './containers/layout/layout.component';
import { InvoicesListComponent } from './invoices/invoices-list/invoices-list.component';
import { AuthGuard, LoginComponent } from '@invoice2-team/users';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: MainLayoutComponent,

        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'invoices',
                component: InvoicesListComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            }
        ]
    },
    { path: '**', pathMatch: 'full', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
