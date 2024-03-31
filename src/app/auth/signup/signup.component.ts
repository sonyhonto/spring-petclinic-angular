import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AppState } from '../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { AuthState } from '../store/auth.reducer';

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


  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>) {
  }


  ngOnInit() {

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      passwordGroup: this.formBuilder.group({
        newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
        newPasswordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
      }, { validator: this.ConfirmedValidator('newPassword', 'newPasswordConfirm') })
    });

    this.authState = this.store.select('auth');
  }

  onSubmitted() {
    this.store.dispatch(new AuthActions.SignUp(
      {
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.passwordGroup.newPassword,
        passwordRepeat: this.signUpForm.value.passwordGroup.newPasswordConfirm
      }));
  }

  passwordMatchCheckValidator(control: FormGroup): { [s: string]: boolean } {
    if (control.value.newPassword !== control.value.newPasswordConfirm) {
      return { noMatch: true };
    }
    return null;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
