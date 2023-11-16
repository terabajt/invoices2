import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Customer, CustomerService } from '@invoice2-team/invoices';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
    selector: 'invoice2-team-customer-item',
    templateUrl: './customer-item.component.html',
    styles: []
})
export class CustomerItemComponent implements OnInit {
    isLoadingResults = false;
    editMode = true;
    form!: FormGroup;
    clientName = '';
    floatLabelControl = new FormControl('auto' as FloatLabelType);
    currentUserId = '653b983bd205a74cb5491fa5';
    customerId = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private _toast: MatSnackBar,
        private _dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._initCustomerForm();
    }

    private _initCustomerForm() {
        this.route.params.pipe().subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.customerService.getCustomer(params['id']).subscribe((customer: Customer) => {
                    this.customerId = customer._id || '';
                    this.clientName = customer.name || '';
                    this.form = this.formBuilder.group({
                        name: [customer.name, Validators.required],
                        taxNumber: [customer.taxNumber, Validators.required],
                        address1: [customer.address1, Validators.required],
                        address2: [customer.address2],
                        zip: [customer.zip, Validators.required],
                        email: [customer.email, [Validators.required, Validators.email]],
                        phone: [customer.phone, Validators.required],
                        city: [customer.city, Validators.required]
                    });
                });
            } else {
                this.editMode = false;
                this.form = this.formBuilder.group({
                    name: ['', Validators.required],
                    taxNumber: ['', Validators.required],
                    address1: ['', Validators.required],
                    address2: [''],
                    zip: ['', Validators.required],
                    email: ['', [Validators.required, Validators.email]],
                    phone: ['', Validators.required],
                    city: ['', Validators.required]
                });
            }
        });
    }

    getFloatLabelValue(): FloatLabelType {
        return this.floatLabelControl.value || 'auto';
    }

    onSaveForm() {
        if (this.editMode) {
            const formData = this.form.value;
            const newCustomer: Customer = {
                name: formData.name,
                taxNumber: formData.taxNumber,
                address1: formData.address1,
                address2: formData.address2,
                zip: formData.zip,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                userId: this.currentUserId,
                _id: this.customerId
            };
            this.customerService.updateCustomer(newCustomer).subscribe(
                () => {
                    this._toast.open(`Dane klienta zostały zaktualizowane.`);
                },
                (err) => {
                    this._toast.open('Wystąpił błąd podczas aktualizacji danych klienta: ', err);
                }
            );
        } else if (!this.editMode) {
            const formData = this.form.value;
            const newCustomer: Customer = {
                name: formData.name,
                taxNumber: formData.taxNumber,
                address1: formData.address1,
                address2: formData.address2,
                zip: formData.zip,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                userId: this.currentUserId,
                _id: this.customerId
            };
            this.customerService.addCustomer(newCustomer).subscribe(
                () => {
                    this._toast.open(`Nowy klient został dodany.`);
                    this.router.navigate(['/customers']);
                },
                () => {
                    this._toast.open('Wystąpił błąd podczas dodawania klienta: ');
                }
            );
        }
    }

    onCancel() {
        const dialogRef = this._dialog.open(DialogComponent, {
            data: {
                message: 'Wszystkie niezapisane zmiany zostaną utracone. Czy na pewno chcesz anulować?'
            }
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.router.navigate(['/customers']);
            }
        });
    }
}
