import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice, InvoicesService } from '@invoice2-team/invoices';
import { DialogComponent } from '../../shared/dialog/dialog.component';

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
    isLoadingResults = true;
    invoices: Invoice[] = [];

    constructor(private invoiceService: InvoicesService, private _dialog: MatDialog) {}

    ngOnInit() {
        this.paginator._intl.itemsPerPageLabel = 'Ilość faktur na stronie';
        this._initInvoices();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    private _initInvoices() {
        this.invoiceService.getInvoices().subscribe((invoices) => {
            this.dataSource = new MatTableDataSource(invoices);
            this.isLoadingResults = false;
        });
    }

    displayedColumns: string[] = ['invoiceNumber', 'invoiceDate', 'dueDate', 'customer', 'netAmountSum', 'grossSum', 'more', 'delete'];
    dataSource = new MatTableDataSource(this.invoices);

    onDeleteInvoice(element: any) {
        const dialogRef = this._dialog.open(DialogComponent, {
            data: {
                message: 'Czy na pewno chcesz usunąć fakturę?'
            }
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                console.log('Usunięto');
            }
        });
    }
}
