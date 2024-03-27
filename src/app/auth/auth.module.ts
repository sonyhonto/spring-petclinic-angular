
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


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
    SignupComponent
  ],
  exports: [
    SigninComponent,
    SignupComponent
  ],

  providers: [
  ]
})
export class AuthModule {
}

