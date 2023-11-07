import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { EntryItem, InvoicesService } from '@invoice2-team/invoices';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
    netAmountEntry = 0;
    taxEntry = 0;
    grossEntry = 0;

    constructor(
        private formBuilder: FormBuilder,
        private invoiceService: InvoicesService,
        private route: ActivatedRoute,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer
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
                    if (invoice.entryItem) {
                        const entryItemsArray = this.formBuilder.array(
                            invoice.entryItem.map((item: EntryItem) => {
                                if (item.netAmountEntry) this.netAmountEntry += item.netAmountEntry;
                                if (item.taxEntry) this.taxEntry += item.taxEntry;
                                if (item.quantityEntry && item.netAmountEntry)
                                    this.grossEntry += item.quantityEntry * item.netAmountEntry * (item.taxEntry || 0);

                                return this.formBuilder.group({
                                    nameEntry: [item.nameEntry, Validators.required],
                                    quantityEntry: [item.quantityEntry, Validators.required],
                                    taxEntry: [item.taxEntry, Validators.required],
                                    netAmountEntry: [item.netAmountEntry, Validators.required],
                                    grossEntry: [item.grossEntry, Validators.required]
                                });
                            }) || []
                        );

                        if (invoice.invoiceNumber) this.invoiceNumber = invoice.invoiceNumber;

                        this.form = this.formBuilder.group({
                            invoiceNumber: [invoice.invoiceNumber, Validators.required],
                            invoiceDate: [invoice.invoiceDate ? new Date(invoice.invoiceDate) : null, Validators.required],
                            dueDate: [invoice.dueDate ? new Date(invoice.dueDate) : null, Validators.required],
                            customer: [invoice.customer],
                            entryItems: entryItemsArray,
                            netAmountSum: [this.netAmountEntry, Validators.required],
                            taxSum: [this.taxEntry, Validators.required],
                            grossSum: [this.grossEntry, Validators.required]
                        });
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
    }

    addEntryItem() {
        const entryItems = this.form.get('entryItems') as FormArray;
        entryItems.push(
            this.formBuilder.group({
                nameEntry: ['', Validators.required],
                quantityEntry: ['', Validators.required],
                taxEntry: ['', Validators.required],
                netAmountEntry: ['', Validators.required],
                grossEntry: ['', Validators.required]
            })
        );
    }
}
