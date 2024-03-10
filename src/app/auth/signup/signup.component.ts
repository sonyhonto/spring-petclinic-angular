import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subscribable } from 'rxjs/internal/types';
import { AuthState } from '../store/auth.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import * as AuthActions from '../store/auth.actions';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  authState: Observable<AuthState>;

  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';


  profileForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    passwordGroup: this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
      newPasswordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
    }, this.passwordMatchCheckValidator.bind(this))
  });

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
      }, this.passwordMatchCheckValidator.bind(this))
    });

    this.authState = this.store.select('auth');
  }


  onSubmit() {
    console.log('profile form : ', this.profileForm);
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
}
