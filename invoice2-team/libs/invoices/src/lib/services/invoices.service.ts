import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';

@Injectable({
    providedIn: 'root'
})
export class InvoicesService {
    apiURLInvoices = environment.apiURL + 'invoices';

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
}
