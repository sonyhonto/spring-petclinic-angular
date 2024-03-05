import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { VetService } from 'app/vets/vet.service';
import { VetResolver } from 'app/vets/vet-resolver';



@NgModule({
  imports: [
    CommonModule,
    // AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent
  ],
  exports: [
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent
  ],
  providers: [VetService, VetResolver]
})
export class AuthModule { }
