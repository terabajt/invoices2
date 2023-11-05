import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

    ngOnInit() {
        this.paginator._intl.itemsPerPageLabel = 'Ilość faktur na stronie';
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
    isLoadingResults = false;

    ELEMENT_DATA = [
        {
            id: 1,
            invoiceNumber: 'FV/1/1/2023',
            invoiceDate: '10.01.2023',
            dueDate: '24.01.2023',
            customer: 'Terabajt Company',
            netAmountSum: 1000,
            grossSum: 1123
        },
        {
            id: 2,
            invoiceNumber: 'FV/2/1/2023',
            invoiceDate: '12.01.2023',
            dueDate: '24.01.2023',
            customer: 'Terabajt Company',
            netAmountSum: 1000,
            grossSum: 1123
        },
        {
            id: 3,
            invoiceNumber: 'FV/3/1/2023',
            invoiceDate: '13.01.2023',
            dueDate: '24.01.2023',
            customer: 'Terabajt Company',
            netAmountSum: 1000,
            grossSum: 1123
        },
        {
            id: 4,
            invoiceNumber: 'FV/4/1/2023',
            invoiceDate: '15.01.2023',
            dueDate: '24.01.2023',
            customer: 'Terabajt Company',
            netAmountSum: 1000,
            grossSum: 1123
        },
        {
            id: 5,
            invoiceNumber: 'FV/5/1/2023',
            invoiceDate: '17.01.2023',
            dueDate: '24.01.2023',
            customer: 'Terabajt Company',
            netAmountSum: 1000,
            grossSum: 1123
        },
        {
            id: 6,
            invoiceNumber: 'FV/5/1/2023',
            invoiceDate: '17.01.2023',
            dueDate: '24.01.2023',
            customer: 'Terabajt Company',
            netAmountSum: 1000,
            grossSum: 1123
        },
        {
            id: 7,
            invoiceNumber: 'FV/6/1/2023',
            invoiceDate: '17.01.2023',
            dueDate: '24.01.2023',
            customer: 'Terabajt Company',
            netAmountSum: 1000,
            grossSum: 1123
        },
        {
            id: 8,
            invoiceNumber: 'FV/7/1/2023',
            invoiceDate: '17.01.2023',
            dueDate: '24.01.2023',
            customer: 'Terabajt Company',
            netAmountSum: 1000,
            grossSum: 1123
        }
    ];

    displayedColumns: string[] = ['invoiceNumber', 'invoiceDate', 'dueDate', 'customer', 'netAmountSum', 'grossSum', 'menu'];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
}
