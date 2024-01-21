import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        iconComponent: { name: 'cil-speedometer' },
        badge: {
            color: 'info',
            text: 'NEWs'
        }
    },
    {
        name: 'Faktury',
        url: '/base',
        iconComponent: { name: 'cil-notes' },
        children: [
            {
                name: 'Lista faktur',
                url: '/invoices'
            },
            {
                name: 'Dodaj fakturę',
                url: '/base/breadcrumbs'
            }
        ]
    },
    {
        title: true,
        name: 'Faktury',
        url: '/dashboard'
    },
    {
        name: 'Ustawienia',
        url: '/dashboard',
        iconComponent: { name: 'cil-drop' }
    }
];
