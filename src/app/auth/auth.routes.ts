import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";



export const AuthRoutes = [
    { path: 'login', component: SigninComponent, canActivate: [true]},
    { path: 'signup', component: SignupComponent, canActivate: [true]},
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [true]}
];