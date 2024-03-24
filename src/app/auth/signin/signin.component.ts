import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Owner } from 'app/owners/owner';
import { AppState } from '../store/app.reducers';
import { Observable } from 'rxjs/internal/Observable';
import { AuthState } from '../store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  auth$: Observable<AuthState>;

  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';

  errors: [];
  // errorsMockTrue = [{
  //   "errorEffect": 'SIGN_IN',
  //   "error400": { "status": 400 },
  //   "error401": { "status": 401 },
  //   "error500": { "status": 500 },
  //   "error0": { "status": 0 },
  //   "error": { "status": -1 }
  // }];



  // authState = '';

  // owner: Owner;
  // errorMessage: string;

  // add app state , store add it to init

  profileForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
  });

  constructor(private store: Store<{ auth: AuthState }>,
    private formBuilder: FormBuilder,
    private authService: AuthService) {

  }

  ngOnInit() {
    this.auth$ = this.store.select('auth');
  }

  signIn() {
    this.store.dispatch(new AuthActions.SignIn({ email: null, password: null }));
  }

  signOut() {
    this.store.dispatch(new AuthActions.SignOut());
  }


  onSubmit() {
    // change app stete
    // store
    // get jwt token

    // this.signIn();

    console.log("email : " + this.profileForm.value.email);
    console.log("password : " + this.profileForm.value.password);
    // this.store.dispatch(new AuthActions.SignIn({
    //   email: this.signInForm.value.email,
    //   password: this.signInForm.value.password
    // }));

    // this.authService.authenticate2();

    this.authService.getToken()
      .subscribe(response => {
        console.log("token email : " + response.email);
        console.log("token jwt : " + response.token);
      });

    // this.vetService.getVets().pipe(
    //   finalize(() => {
    //     this.isVetDataReceived = true;
    //   })
    // ).subscribe(
    //   vets => this.vets = vets,
    //   error => this.errorMessage = error as any);

  }

  // printConsole() {
  //   console.log("errors mock : ", this.errorsMockTrue);
  // }

  // onSubmit() {
  //   console.log('value : ', this.profileForm.value);
  //   console.log('valid : ', this.profileForm.valid);
  //   console.log('this.profileForm : ', this.profileForm);
  // }

  getTestHome() {
    this.authService.getTestHome()
    .subscribe(response => {
      console.log("this is hello : ", response);
    });

    // console.log("getTestHome ...");
  
  }

}


