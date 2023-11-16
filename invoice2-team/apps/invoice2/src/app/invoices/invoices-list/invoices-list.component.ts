import { AfterViewInit, Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice, InvoicesService } from '@invoice2-team/invoices';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    currentUserId = '653b983bd205a74cb5491fa5';

    constructor(private invoiceService: InvoicesService, private _dialog: MatDialog, private _toast: MatSnackBar) {}

    ngOnInit() {
        this.paginator._intl.itemsPerPageLabel = 'Ilość faktur na stronie';
        this._initInvoices();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    private _initInvoices() {
        this.invoiceService.getInvoices(this.currentUserId).subscribe((invoices) => {
            this.dataSource = new MatTableDataSource(invoices);
            this.isLoadingResults = false;
        });
    }

    displayedColumns: string[] = ['invoiceNumber', 'invoiceDate', 'dueDate', 'customer', 'netAmountSum', 'grossSum', 'more', 'delete'];
    dataSource = new MatTableDataSource(this.invoices);

    onDeleteInvoice(invoiceID: string) {
        const dialogRef = this._dialog.open(DialogComponent, {
            data: {
                message: 'Czy na pewno chcesz usunąć fakturę?'
            }
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.invoiceService.deleteInvoice(invoiceID).subscribe(
                    () => {
                        this._toast.open(`Pomyślnie usnięto fakturę.`);
                        this._initInvoices();
                    },
                    (err) => {
                        this._toast.open(`Wystąpił błąd podczas usówania faktury: ${err}`);
                    }
                );
            }
        });
    }
}
