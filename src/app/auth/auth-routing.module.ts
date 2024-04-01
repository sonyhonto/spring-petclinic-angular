/**
 * @author Sony Honto
 */

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { SignupComponent } from 'app/auth/signup/signup.component';
import { SigninComponent } from 'app/auth/signin/signin.component';

const authRoutes: Routes = [
    {path: 'auth/signin', component: SigninComponent},
    {path: 'auth/signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {
}
