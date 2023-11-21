import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.services';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
    selector: 'invoice2-team-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
    floatLabelControl = new FormControl('auto' as FloatLabelType);
    loginFormGroup: FormGroup = new FormGroup({});
    endsubs$: Subject<any> = new Subject();
    authError = false;
    errorMessage = 'E-mail albo hasło jest nieprawidłowe';

    constructor(private formBuilder: FormBuilder, private auth: AuthService, private localstorageService: LocalstorageService, private router: Router) {}

    ngOnInit(): void {
        this._initLoginForms();
    }

    private _initLoginForms() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['max@gmail.com', [Validators.required, Validators.email]],
            password: ['123456', Validators.required]
        });
    }
    get loginForm() {
        return this.loginFormGroup.controls;
    }
    getFloatLabelValue(): FloatLabelType {
        return this.floatLabelControl.value || 'auto';
    }
    onSubmit() {
        const loginData = {
            email: this.loginForm['email'].value,
            password: this.loginForm['password'].value
        };
        this.auth
            .login(loginData.email, loginData.password)
            .pipe(takeUntil(this.endsubs$))
            .subscribe(
                (user) => {
                    this.authError = false;
                    if (user.token) this.localstorageService.setToken(user.token);
                    this.router.navigate(['/']);
                },
                (error: HttpErrorResponse) => {
                    this.authError = true;
                    if (error.status == 404) {
                        this.errorMessage = `Wystąpił błąd: ${error.error}`;
                    }
                }
            );
    }
    ngOnDestroy(): void {
        this.endsubs$.complete();
    }
}
