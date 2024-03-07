import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  errors: [];
  errorsMockTrue = [{
    "errorEffect": 'SIGN_IN',
    "error400": {"status": 400},
    "error401": {"status": 401},
    "error500": {"status": 500},
    "error0": {"status": 0},
    "error": {"status": -1}
  }]; 

  signInForm: FormGroup;
  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';

  authState = '';


  ngOnInit() {

    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(52)]),
    });

    // this.authState = this.store.select('auth');
    this.authState = '';


  }

  onSubmitted() {
    // this.store.dispatch(new AuthActions.SignIn({
    //   email: this.signInForm.value.email,
    //   password: this.signInForm.value.password
    // }));
  }

  printConsole() {
    console.log("errors mock : ", this.errorsMockTrue);
  }

}
