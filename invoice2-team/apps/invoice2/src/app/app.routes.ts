import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { InvoicesListComponent } from './invoices/invoices-list/invoices-list.component';
import { InvoiceItemComponent } from './invoices/invoice-item/invoice-item.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: ShellComponent,
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
                path: 'invoices/:id',
                component: InvoiceItemComponent
            }
        ]
    }
];
