/**
 * @author Sony Honto
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../auth.service';
import * as AuthActions from '../../auth/store/auth.actions';
import { AuthState } from '../store/auth.reducer';
import { Router } from '@angular/router';


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
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.auth$ = this.store.select('auth');
  }

  onSubmit() {
    const credentials = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.password
    };

    this.authService.getToken(credentials)
      .subscribe(
        response => {
          this.store.dispatch(new AuthActions.SignIn({ token: response.token }));
          this.token = response.token;
          this.router.navigate(['/welcome']);
        },
        error => {
          console.log("Petclinic: Bad login or password");
        });

  }

}


