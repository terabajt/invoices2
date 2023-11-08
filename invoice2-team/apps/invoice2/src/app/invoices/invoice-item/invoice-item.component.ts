import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryItem, Invoice, InvoicesService } from '@invoice2-team/invoices';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
    selector: 'invoice2-team-invoice-item',
    templateUrl: './invoice-item.component.html'
})
export class InvoiceItemComponent implements OnInit {
    isLoadingResults = false;
    editMode = true;
    form!: FormGroup;
    dueDatePicker: Date | null = null;
    floatLabelControl = new FormControl('auto' as FloatLabelType);
    hideRequiredControl = new FormControl(false);
    invoiceNumber!: string;
    invoiceId!: string;
    netAmountSum = 0;
    grossSum = 0;

    showDialog(): void {
        const dialogRef = this._dialog.open(DialogComponent);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.router.navigate(['/invoices']);
            }
        });
    }

    constructor(
        private formBuilder: FormBuilder,
        private invoiceService: InvoicesService,
        private route: ActivatedRoute,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private _toast: MatSnackBar,
        private _dialog: MatDialog,
        private router: Router
    ) {
        this.iconRegistry.addSvgIcon('delete', this.sanitizer.bypassSecurityTrustResourceUrl('assets/delete.svg'));
    }
    getFloatLabelValue(): FloatLabelType {
        return this.floatLabelControl.value || 'auto';
    }
    ngOnInit(): void {
        this._invoiceInit();
    }
    private _invoiceInit() {
        this.route.params.pipe().subscribe((params) => {
            if (params['id']) {
                this.invoiceService.getInvoice(params['id']).subscribe((invoice) => {
                    if (invoice.invoiceNumber) this.invoiceNumber = invoice.invoiceNumber;
                    this.invoiceId = params['id'];
                    console.log(invoice.invoiceNumber);
                    if (invoice.entryItem) {
                        const entryItemsArray = this.formBuilder.array(
                            invoice.entryItem.map((item: EntryItem) => {
                                const formItems = this.formBuilder.group({
                                    nameEntry: [item.nameEntry, Validators.required],
                                    quantityEntry: [item.quantityEntry, Validators.required],
                                    taxEntry: [item.taxEntry?.toString(), Validators.required],
                                    netAmountEntry: [item.netAmountEntry, Validators.required],
                                    grossEntry: [(item.quantityEntry || 0) * (item.taxEntry || 0) * (item.netAmountEntry || 0), Validators.required]
                                });

                                // Sbuscribe changes in form constrols for recalculate gross entry
                                formItems.get('quantityEntry')?.valueChanges.subscribe(() => {
                                    this.updateGrossEntry(formItems);
                                });

                                formItems.get('taxEntry')?.valueChanges.subscribe(() => {
                                    this.updateGrossEntry(formItems);
                                });

                                formItems.get('netAmountEntry')?.valueChanges.subscribe(() => {
                                    this.updateGrossEntry(formItems);
                                });

                                return formItems;
                            }) || []
                        );
                        entryItemsArray.controls.forEach((control) => {
                            const formItems = control as FormGroup;

                            // Subuscribe changes in form constrols for recalculate gross entry for new added items
                            formItems.get('quantityEntry')?.valueChanges.subscribe(() => {
                                this.updateGrossEntry(formItems);
                            });

                            formItems.get('taxEntry')?.valueChanges.subscribe(() => {
                                this.updateGrossEntry(formItems);
                            });

                            formItems.get('netAmountEntry')?.valueChanges.subscribe(() => {
                                this.updateGrossEntry(formItems);
                            });
                        });

                        this.form = this.formBuilder.group({
                            invoiceNumber: [invoice.invoiceNumber, Validators.required],
                            invoiceDate: [invoice.invoiceDate ? new Date(invoice.invoiceDate) : null, Validators.required],
                            dueDate: [invoice.dueDate ? new Date(invoice.dueDate) : null, Validators.required],
                            customer: [invoice.customer],
                            entryItems: entryItemsArray,
                            netAmountSum: [this.netAmountSum, Validators.required],
                            grossSum: [this.grossSum, Validators.required]
                        });

                        this.updateGrossEntry(this.form);
                    } else {
                        this.editMode = false;
                    }
                });
            } else {
                this.editMode = false;
            }
        });
    }
    isEntryItemsFormArrayNotEmpty(): boolean {
        const entryItems = this.form.get('entryItems') as FormArray;
        return entryItems && entryItems.length > 0;
    }
    get entryItemsArray() {
        return this.form.get('entryItems') as FormArray;
    }
    getControls() {
        return (this.form.get('entryItems') as FormArray).controls;
    }
    removeEntryItem(index: number) {
        const entryItems = this.form.get('entryItems') as FormArray;
        entryItems.removeAt(index);
        this.updateSums();
    }
    addEntryItem() {
        const entryItems = this.form.get('entryItems') as FormArray;
        const newEntryItem = this.formBuilder.group({
            nameEntry: ['', Validators.required],
            quantityEntry: [0, Validators.required],
            taxEntry: ['23', Validators.required],
            netAmountEntry: [0, Validators.required],
            grossEntry: [0, Validators.required]
        });
        entryItems.push(newEntryItem);

        newEntryItem.get('quantityEntry')?.valueChanges.subscribe(() => {
            this.updateGrossEntry(newEntryItem);
        });

        newEntryItem.get('taxEntry')?.valueChanges.subscribe(() => {
            this.updateGrossEntry(newEntryItem);
        });

        newEntryItem.get('netAmountEntry')?.valueChanges.subscribe(() => {
            this.updateGrossEntry(newEntryItem);
        });
        this.updateGrossEntry(newEntryItem);
    }
    private updateGrossEntry(formItems: FormGroup) {
        const quantity = +formItems.get('quantityEntry')?.value || 0;
        const tax = +formItems.get('taxEntry')?.value || 0;
        const netAmount = +formItems.get('netAmountEntry')?.value || 0;

        // Changed for mat-option optimized
        const grossEntry = +(quantity * (1 + tax / 100) * netAmount).toFixed(2);
        formItems.patchValue({ grossEntry }, { emitEvent: false });
        this.updateSums();
    }

    private updateSums() {
        const entryItemsArray = this.form.get('entryItems') as FormArray;
        let netAmountSum = 0;
        let grossSum = 0;
        entryItemsArray.controls.forEach((control) => {
            const quantityEntry = +control.get('quantityEntry')?.value || 0;
            const netAmountEntry = +control.get('netAmountEntry')?.value || 0;
            netAmountSum += quantityEntry * netAmountEntry;
            grossSum += control.get('grossEntry')?.value || 0;
        });
        this.form.patchValue({ netAmountSum: netAmountSum.toFixed(2), grossSum }, { emitEvent: false });
    }
    get invoiceForm() {
        return this.form.controls;
    }
    onSaveForm() {
        if (this.form.invalid) {
            return console.log('invalid');
        }

        if (this.editMode) {
            const formData = this.form.value;
            const newInvoice: Invoice = {
                invoiceNumber: formData.invoiceNumber,
                invoiceDate: formData.invoiceDate,
                dueDate: formData.dueDate,
                customer: formData.customer,
                entryItem: formData.entryItem,
                user: formData.user,
                netAmountSum: formData.netAmountSum,
                grossSum: formData.grossSum
            };
            this._updateInvoice(newInvoice);
        } else {
            console.log('add new invoice');
        }
    }
    private _updateInvoice(invoice: Invoice) {
        this.invoiceService
            .updateInvoice(invoice, this.invoiceId)
            .pipe()
            .subscribe((invoice: Invoice) => {
                this._toast.open(`Pomyślnie zapisano fakturę ${invoice.invoiceNumber}`);
            });
    }
}
