import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Specialty } from 'app/specialties/specialty';
import { Vet } from 'app/vets/vet';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;
  emailPattern = '^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$';
  innerLoading = false;

  firstNameCtrl: FormControl;
  lastNameCtrl: FormControl;
  vetEditForm: FormGroup;
  specList: Specialty[];
  compareSpecFn: (o1: any,o2: any) => boolean;

  onForgotPasswordFormSubmit() {
    this.innerLoading = true;
    // this.accountService.forgotPasswordRequest(this.forgotPasswordForm.value.email)
    //   .pipe(take(1), catchError(
    //     error => {
    //       this.innerLoading = false;
    //       alert('An error occurred. Please try again.');
    //       return throwError(error);
    //     }
    //   ))
    //   .subscribe(res => {
    //     this.innerLoading = false;
    //     this.forgotPasswordForm.reset();
    //     alert('Success! A verification link has been sent if an account exists with this email.');
    //   });

  }

  onSubmit(vet: Vet) {
    // this.vetService.updateVet(vet.id.toString(), vet).subscribe(
    //   res => {
    //     console.log('update success');
    //     this.gotoVetList();
    //   },
    //   error => this.errorMessage = error as any);

  }

  gotoVetList() {
    // this.router.navigate(['/vets']);
  }
}
