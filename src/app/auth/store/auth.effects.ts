import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from "rxjs/operators";
import * as AuthActions from '../../auth/store/auth.actions';
import { of } from "rxjs";

// @Injectable()
// export class AuthEffects {

//     // @Effect()
//     signIn = this.actions$
//         .pipe(AuthActions.SIGN_IN,
//             map((action: AuthActions.SignIn) => {
//                 return action.payload;
//             }),
//             switchMap((credentials: { email: string, password: string, password2: string }) => {
//                 return this.tokenService.obtainAccessToken(credentials.email, credentials.password)
//                     .pipe(switchMap(res => {
//                         this.tokenService.saveToken(res);
//                         this.router.navigate(['/']);
//                         return [
//                             { type: AuthActions.SIGN_IN_SUCCESS, payload: { effect: AuthActions.SIGN_IN } },
//                             { type: AuthActions.FETCH_VERIFICATION_STATUS }
//                         ];
//                     }), catchError(error => of(new AuthActions.AuthError({ error, errorEffect: AuthActions.SIGN_IN }))));
//             }));

//     // constructor(private actions$: Actions, private tokenService: TokenService,
//     //     private router: Router, private accountService: AccountService) {
//     // }

//     constructor(private actions$: Actions, private tokenService: TokenService,
//         private router: Router, private accountService: AccountService) {
//     }
// }


