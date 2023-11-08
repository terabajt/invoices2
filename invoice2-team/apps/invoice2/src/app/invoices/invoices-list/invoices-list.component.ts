import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice, InvoicesService } from '@invoice2-team/invoices';

@Component({
    selector: 'invoice2-team-invoices-list',
    templateUrl: './invoices-list.component.html',
    styles: []
})
export class InvoicesListComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: true })
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;

    constructor(private invoiceService: InvoicesService) {}

    ngOnInit() {
        this.paginator._intl.itemsPerPageLabel = 'Ilość faktur na stronie';
        this._initInvoices();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    isLoadingResults = false;

    invoices: Invoice[] = [];

    private _initInvoices() {
        this.invoiceService.getInvoices().subscribe((invoices) => {
            this.dataSource = new MatTableDataSource(invoices);
        });
    }

    displayedColumns: string[] = ['invoiceNumber', 'invoiceDate', 'dueDate', 'customer', 'netAmountSum', 'grossSum', 'menu'];
    dataSource = new MatTableDataSource(this.invoices);
}
