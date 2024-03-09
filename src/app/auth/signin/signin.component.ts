import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder } from '@angular/forms';
import { Owner } from 'app/owners/owner';
import { OwnerService } from 'app/owners/owner.service';

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

  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';

  authState = '';

  profileForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
    home: [''],
  });

  owner: Owner;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private ownerService: OwnerService, private router: Router) {
    this.owner = {} as Owner;
  }

  ngOnInit() {

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

  onSubmit() {
    console.log('value : ', this.profileForm.value);
    console.log('valid : ', this.profileForm.valid);
  }

}
