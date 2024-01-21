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
        url: '/invoices',
        iconComponent: { name: 'cil-notes' },
        children: [
            {
                name: 'Lista faktur',
                url: '/invoices'
            },
            {
                name: 'Dodaj fakturę',
                url: '/invoices/form'
            }
        ]
    },
    {
        name: 'Klienci',
        url: '/customers',
        iconComponent: { name: 'cil-user' },
        children: [
            {
                name: 'Lista klientów',
                url: '/customers'
            },
            {
                name: 'Dodaj klienta',
                url: '/customers/form'
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
