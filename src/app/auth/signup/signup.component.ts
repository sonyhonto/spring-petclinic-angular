import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { Subscribable } from 'rxjs/internal/types';
import { AuthState } from '../store/auth.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

// const initialState: AuthState = {
//   authenticated: false,
//   isActive: null,
//   errors: [],
//   loading: false
// };

const initialState: AuthState = {
  authenticated: true,
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
  // authState: AuthState = initialState;
  authState: Observable<AuthState> = of(initialState);


  // authState: Observable<AuthState>;

  // authState: Observable<AuthState> = {
  //   authenticated: false,
  //   isActive: null,
  //   errors: [],
  //   loading: false
  // };



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

    // this.store.select('auth').subscribe(state => {
    //   this.authState = state;
    // });

  }


  onSubmit() {
    // console.log('profile form : ', this.profileForm);
    console.log('signup form : ', this.signUpForm);
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
