import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../auth.service';
import * as AuthActions from '../../auth/store/auth.actions';
import { AuthState } from '../store/auth.reducer';
import { tokenScore } from '../../auth/store/auth.actions';


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

  // errorsMockTrue = [{
  //   "errorEffect": 'SIGN_IN',
  //   "error400": { "status": 400 },
  //   "error401": { "status": 401 },
  //   "error500": { "status": 500 },
  //   "error0": { "status": 0 },
  //   "error": { "status": -1 }
  // }];

  // profileForm = this.formBuilder.group({
  //   email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  //   password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
  // });

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
    // this.store.dispatch(new AuthActions.SignIn({ email: null, password: null, token: this.token }));
    const tok = 'token is set';
    this.store.dispatch(new AuthActions.SignIn({ token: tok }));

    this.store.dispatch(tokenScore());
  }

  signOut() {
    this.store.dispatch(new AuthActions.SignOut());
  }

  // onSubmit() {
  //   // change app stete
  //   // store
  //   // get jwt token

  //   console.log("email : " + this.profileForm.value.email);
  //   console.log("password : " + this.profileForm.value.password);
  //   this.authService.getToken()
  //     .subscribe(response => {
  //       console.log("token email : " + response.email);
  //       console.log("token jwt : " + response.token);
  //     });
  // }

  onSubmit() {
    const credentials = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.password
    };
    console.log("email : " + this.profileForm.value.email);
    console.log("password : " + this.profileForm.value.password);

    this.authService.getToken(credentials)
      .subscribe(
        response => {
          console.log("token email : " + response.email);
          console.log("token jwt : " + response.token);
          this.token = response.token;
          this.signIn();
        },
        error => {
          // console.log(error.error);
          console.log("Bad login or password");
        });
  }

}


