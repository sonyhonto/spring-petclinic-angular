import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    AuthRoutingModule
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
  providers: [
    // VetService, 
    // VetResolver
]
})
export class AuthModule {
}