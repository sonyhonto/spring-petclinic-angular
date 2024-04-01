/**
 * @author Sony Honto
 */

import { Action } from '@ngrx/store';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export class SignUp implements Action {
  readonly type = SIGN_UP;

}

export class SignIn implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: { token: string }) {
  }
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export type AuthActions = SignUp | SignIn | SignOut ;
