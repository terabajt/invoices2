import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { EntryItem } from '../models/entryItem';

@Injectable({
    providedIn: 'root'
})
export class InvoicesService {
    apiURLInvoices = environment.apiURL + 'invoices';
    apiURLItems = 'entryitem';

    constructor(private http: HttpClient) {}
    getInvoices(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(`${this.apiURLInvoices}`);
    }

    getInvoice(invoiceId: string): Observable<Invoice> {
        return this.http.get<Invoice>(`${this.apiURLInvoices}/${invoiceId}`);
    }
    updateInvoice(invoice: Invoice, invoiceId: string) {
        return this.http.put<Invoice>(`${this.apiURLInvoices}/${invoiceId}`, invoice);
    }
    addInvoice(invoice: Invoice) {
        return this.http.post<Invoice>(`${this.apiURLInvoices}`, invoice);
    }
    updateEntryItem(items: EntryItem[]) {
        items.map((item) => {
            if (item._id) {
                this.http.put<EntryItem>(`${this.apiURLInvoices}/${this.apiURLItems}/${item._id}`, item).subscribe();
            } else {
                this.http.post<EntryItem>(`${this.apiURLInvoices}/${this.apiURLItems}`, item).subscribe();
            }
        });
    }
    deleteEntryItem(itemId: string) {
        return this.http.delete<EntryItem>(`${this.apiURLInvoices}/${this.apiURLItems}/${itemId}`);
    }
    deleteInvoice(invoiceId: string) {
        console.log('Removed', invoiceId);
        return this.http.delete<Invoice>(`${this.apiURLInvoices}/${invoiceId}`);
    }
    getNumberOfInvoices() {
        return this.http.get<{ invoicesCount: number }>(`${this.apiURLInvoices}/get/invoicesNumber`);
    }
}
