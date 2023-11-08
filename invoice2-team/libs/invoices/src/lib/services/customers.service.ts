import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    apiURLCustomer = environment.apiURL + 'customers';

    constructor(private http: HttpClient) {}

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.apiURLCustomer}`);
    }
}
