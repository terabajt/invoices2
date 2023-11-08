import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer, CustomerService } from '@invoice2-team/invoices';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
    selector: 'invoice2-team-customers-list',
    templateUrl: './customers-list.component.html',
    styles: []
})
export class CustomersListComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: true })
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;
    customers: Customer[] = [];

    constructor(private customerService: CustomerService, private _dialog: MatDialog) {}

    ngOnInit(): void {
        this.paginator._intl.itemsPerPageLabel = 'Ilość faktur na stronie';
        this._initCustomers();
    }
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    private _initCustomers() {
        this.customerService.getCustomers().subscribe((invoices) => {
            this.dataSource = new MatTableDataSource(invoices);
        });
    }

    displayedColumns: string[] = ['name', 'taxNumber', 'email', 'phone', 'city', 'more', 'delete'];
    dataSource = new MatTableDataSource(this.customers);

    onDeleteInvoice(element: any) {
        const dialogRef = this._dialog.open(DialogComponent, {
            data: {
                message: 'Czy na pewno chcesz usunąć kontrahenta?'
            }
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                console.log('Usunięto', element);
            }
        });
    }
}
