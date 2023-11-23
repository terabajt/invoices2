import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, CustomerService, Invoice, InvoicesService } from '@invoice2-team/invoices';
import { User, UsersService } from '@invoice2-team/users';
import { take } from 'rxjs';

@Component({
    selector: 'invoice2-team-print',
    template: `
        <div class="text-center">
            <div class="btn-group">
                <button class="btn btn-outline-danger" (click)="onCancel()">Anuluj</button>
                <button class="btn btn-secondary" (click)="onPrint()">Drukuj</button>
            </div>
        </div>

        <div class="container invoice-print" *ngIf="invoice">
            <div>
                <h2>
                    Numer faktury: <span class="fw-bold">{{ invoice.invoiceNumber }}</span>
                </h2>
            </div>
            <div class="text-right">Data wystawienia: {{ invoice.invoiceDate | date }}</div>
            <div class="text-right">Termin płatności: {{ invoice.dueDate | date }}</div>

            <div class="d-flex flex-row justify-content-between mt-3" *ngIf="user">
                <div *ngIf="user" class="text-right">
                    <h4>Sprzedawca:</h4>
                    <div>
                        <strong>{{ user.name }}</strong>
                    </div>
                    <div>ul. {{ user.address1 }}</div>
                    <div>{{ user.address2 }}</div>
                    <div>{{ user.zip + ' ' + user.city }}</div>
                    <div *ngIf="user.country">Kraj: {{ user.country }}</div>
                    <div *ngIf="user.phone">Telefon: {{ user.phone }}</div>
                    <div>NIP: {{ user.taxNumber }}</div>
                    <div>
                        Numer konta bankowego: <br />
                        {{ user.accountNumber }}
                    </div>
                </div>
                <div class="text-right" *ngIf="customer">
                    <h4>Nabywca:</h4>
                    <div>
                        <strong>{{ customer.name?.toUpperCase() }}</strong>
                    </div>
                    <div>{{ customer.address1 }}</div>
                    <div>{{ user.address1 }}</div>
                    <div>{{ customer.address2 }}</div>
                    <div>ul. {{ customer.zip + ' ' + customer.city }}</div>
                    <div *ngIf="customer.phone">Telefon: {{ customer.phone }}</div>
                    <div>NIP: {{ customer.taxNumber }}</div>
                </div>
            </div>

            <div *ngIf="invoice">
                <div>
                    <br />
                    <h3>Pozycje:</h3>
                    <li class="list-group-item">
                        <div class="d-flex flex-row justify-content-between mb-0">
                            <div>Nazwa</div>
                            <div>Sztuk</div>
                            <div>Kwota NETTO</div>
                            <div>Podatek</div>
                            <div>Wartość BRUTTO</div>
                        </div>
                        <hr />
                    </li>

                    <li *ngFor="let item of invoice.entryItem" class="list-group-item">
                        <div class="d-flex flex-row justify-content-between">
                            <div>{{ item?.nameEntry }}</div>
                            <div>{{ item?.quantityEntry }}</div>
                            <div>{{ item?.netAmountEntry | currency }}</div>
                            <div>{{ item.taxEntry }}</div>
                            <div>{{ item.grossEntry | currency }}</div>
                        </div>
                    </li>
                </div>
                <div class="d-flex flex-row justify-content-end mt-5">
                    <div class="text-right">
                        <hr />
                        <h4>Razem netto: {{ invoice.netAmountSum | currency }}</h4>
                        <h4 class="fw-bold">Do zapłaty brutto: {{ invoice.grossSum | currency }}</h4>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            @media print {
                .btn,
                .invoice2-sidebar {
                    display: none !important;
                }
            }
        `
    ]
})
export class PrintComponent implements OnInit {
    constructor(
        private usersService: UsersService,
        private invoicesService: InvoicesService,
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private router: Router
    ) {}

    user!: User;
    invoice!: Invoice;
    customer!: Customer;

    ngOnInit(): void {
        this._initUser();
        this._initInvoice();
    }

    private _initUser() {
        this.usersService
            .observeCurrentUser()
            .pipe(take(1))
            .subscribe((user) => {
                if (user) this.user = user;
            });
    }
    private _initInvoice() {
        this.route.params.pipe().subscribe((params) => {
            if (params['id']) {
                this.invoicesService.getInvoice(params['id']).subscribe((invoice) => {
                    this.invoice = invoice;
                    if (invoice && invoice.customer) {
                        const customerID = this.invoice.customer || '';
                        this.customerService
                            .getCustomer(customerID)
                            .pipe()
                            .subscribe((customer) => {
                                console.log(customer);
                                this.customer = customer;
                            });
                    }
                });
            }
        });
    }
    onCancel() {
        this.router.navigate(['/invoices']);
    }
    onPrint() {
        document.title = 'Aplikacja Invoices2';
        window.print();
    }
}
