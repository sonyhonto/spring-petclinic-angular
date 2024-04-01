import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../auth.service';
import * as AuthActions from '../../auth/store/auth.actions';
import { setTokenStore } from '../../auth/store/auth.actions';
import { AuthState } from '../store/auth.reducer';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  auth$: Observable<AuthState>;
  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';
  errors: [];
  token: string;


  profileForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });


  constructor(private store: Store<{ auth: AuthState }>,
    private formBuilder: FormBuilder,
    private authService: AuthService) {

  }

  ngOnInit() {
    this.auth$ = this.store.select('auth');
  }

  signIn() {
    const tok = 'token is set';
    this.store.dispatch(new AuthActions.SignIn({ token: tok }));

    // this.store.dispatch(tokenScore()); // simple solution

  }

  setToken() {
    this.store.dispatch(setTokenStore({ token: 'token' }));
  }

  setTokenAction() {
    this.store.dispatch(new AuthActions.SetToken());
  }

  setTokenActionParams() {
    this.store.dispatch(new AuthActions.SetTokenParams({ token: 'setted token' }));
  }

  signOut() {
    this.store.dispatch(new AuthActions.SignOut());
  }

  onSubmit() {
    // d
    const credentials = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.password
    };
    console.log("email : " + this.profileForm.value.email);
    console.log("password : " + this.profileForm.value.password);
    //\d

    this.authService.getToken(credentials)
      .subscribe(
        response => {
          this.store.dispatch(new AuthActions.SignIn({ token: response.token }));
          this.token = response.token;

          console.log("token email : " + response.email);
          console.log("token jwt : " + response.token);
        },
        error => {
          console.log("Bad login or password");
        });

  }

}


