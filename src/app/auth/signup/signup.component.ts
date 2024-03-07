import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscribable } from 'rxjs/internal/types';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm: any;
  authState: Observable<unknown> | Subscribable<unknown> | Promise<unknown>;
}
