import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';


  profileForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    passwordGroup: this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
      newPasswordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(52)]],
    }, this.passwordMatchCheckValidator.bind(this))
  });

  constructor(private formBuilder: FormBuilder) {
  }

  onSubmit() {
    console.log('profile form : ', this.profileForm);
  }

  passwordMatchCheckValidator(control: FormGroup): { [s: string]: boolean } {
    if (control.value.newPassword !== control.value.newPasswordConfirm) {
      return { noMatch: true };
    }
    return null;
  }
}
