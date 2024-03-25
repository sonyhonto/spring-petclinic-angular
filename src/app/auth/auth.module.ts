
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddressExampleComponent } from './store-payload/address-example/address-example.component';


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
    ForgotPasswordComponent,
    AddressExampleComponent
  ],
  exports: [
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    AddressExampleComponent
  ],

  providers: [
    // VetService, 
    // VetResolver
]
})
export class AuthModule {
}

