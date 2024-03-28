import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { Subscribable } from 'rxjs/internal/types';
import { AuthState } from '../store/auth.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

const initialState: AuthState = {
  authenticated: true,
  token: null,
  isActive: null,
  errors: [],
  loading: false
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  authState: Observable<AuthState> = of(initialState);
  isSuccessOnRegistration: boolean = false;

  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>) {
  }


  ngOnInit() {

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      passwordGroup: this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
        newPasswordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
      }, { validator: this.confirmedValidator('newPassword', 'newPasswordConfirm') })
    });
    this.authState = this.store.select('auth');
 }


  onSubmit() {
    console.log('signup form : ', this.signUpForm);
  }

  onSubmitted() {
    const credentials = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.passwordGroup.newPassword,
    }

    this.authService.signUp(credentials)
      .subscribe(
        response => {
          this.store.dispatch(new AuthActions.SignUp());
          this.isSuccessOnRegistration = true;

          setTimeout(() => {
            this.router.navigate(['/auth/signin']);
          }, 3000);
        },
        error => console.log("Invalid login name or password")
      );

  }

  confirmedValidator(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        matchingControl.setErrors({ confirmedValidator: false }); 
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors({ confirmedValidator: false }); 
      }
    };
  }
}
