import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UsersService } from '@invoice2-team/users';
import { take } from 'rxjs';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'invoice2-team-user-item',
    templateUrl: './user-item.component.html',
    styles: []
})
export class UserItemComponent implements OnInit {
    isLoadingResults = false;
    form!: FormGroup;
    floatLabelControl = new FormControl('auto' as FloatLabelType);
    currentUserId = '';

    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private _toast: MatSnackBar,
        private _dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._initUserForm();
    }
    private _initUserForm() {
        this.usersService
            .observeCurrentUser()
            .pipe(take(1))
            .subscribe((user) => {
                if (user && user.id) this.currentUserId = user?.id;
                this.form = this.formBuilder.group({
                    name: [user?.name, Validators.required],
                    password: [user?.password],
                    email: [user?.email, [Validators.required, Validators.email]],
                    phone: [user?.phone, Validators.required],
                    address1: [user?.address1, Validators.required],
                    address2: [user?.address2],
                    zip: [user?.zip, Validators.required],
                    city: [user?.city, Validators.required],
                    country: [user?.country, Validators.required],
                    taxNumber: [user?.taxNumber, Validators.required],
                    accountNumber: [user?.accountNumber, Validators.required]
                });
            });
        this.usersService.initAppSession();
    }

    onSaveForm() {
        const formData = this.form.value;
        const newUserData: User = {
            name: formData.name,
            password: formData.password,
            email: formData.editMode,
            phone: formData.phone,
            address1: formData.address1,
            address2: formData.address2,
            zip: formData.zip,
            city: formData.city,
            country: formData.country,
            taxNumber: formData.taxNumber,
            accountNumber: formData.accountNumber,
            id: this.currentUserId
        };
        this.usersService.updateUser(newUserData).subscribe(
            () => {
                this._toast.open(`Dane zostały zaktualizowane`);
            },
            (err) => {
                this._toast.open('Wystąpił błąd podczas aktualizacji danych', err);
            }
        );
    }

    onCancel() {
        const dialogRef = this._dialog.open(DialogComponent, {
            data: {
                message: 'Wszystkie niezapisane zmiany zostaną utracone. Czy na pewno chcesz anulować?'
            }
        });
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.router.navigate(['/']);
            }
        });
    }

    getFloatLabelValue(): FloatLabelType {
        return this.floatLabelControl.value || 'auto';
    }
}
