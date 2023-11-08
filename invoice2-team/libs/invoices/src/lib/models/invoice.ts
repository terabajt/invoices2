import { Customer } from './customer';
import { EntryItem } from './entryItem';

export class Invoice {
    invoiceNumber?: string;
    invoiceDate?: Date;
    dueDate?: Date;
    customer?: Customer;
    entryItem?: EntryItem[];
    user?: string;
    netAmountSum?: number;
    grossSum?: number;
}
