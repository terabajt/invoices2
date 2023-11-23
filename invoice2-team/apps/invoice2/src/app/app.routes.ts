import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { InvoicesListComponent } from './invoices/invoices-list/invoices-list.component';
import { InvoiceItemComponent } from './invoices/invoice-item/invoice-item.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomerItemComponent } from './customers/customer-item/customer-item.component';
import { AuthGuard } from '@invoice2-team/users';
import { UserItemComponent } from './user/user-item/user-item.component';
import { PrintComponent } from './print/print/print.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: ShellComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'invoices',
                component: InvoicesListComponent
            },
            {
                path: 'invoices/form',
                component: InvoiceItemComponent
            },
            {
                path: 'invoices/form/:id',
                component: InvoiceItemComponent
            },
            {
                path: 'customers',
                component: CustomersListComponent
            },
            {
                path: 'customers/form/:id',
                component: CustomerItemComponent
            },
            {
                path: 'customers/form',
                component: CustomerItemComponent
            },
            {
                path: 'user/form',
                component: UserItemComponent
            },
            {
                path: 'print/:id',
                component: PrintComponent
            }
        ]
    }
];
