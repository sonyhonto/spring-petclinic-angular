import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { SignupComponent } from 'app/auth/signup/signup.component';
import { SigninComponent } from 'app/auth/signin/signin.component';
import { ForgotPasswordComponent } from 'app/auth/forgot-password/forgot-password.component';

const authRoutes: Routes = [
    {path: 'auth/signin', component: SigninComponent},
    {path: 'auth/signup', component: SignupComponent},
    {path: 'auth/forgotpass', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {
}
