import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/auth/store/auth.reducer';
import { Observable } from 'rxjs';
import * as AuthActions from '../auth/store/auth.actions';
// import { SignIn } from '../auth/store/auth.actions';
// import { AuthActions } from '../auth/store/auth.actions'; 

@Component({
  selector: 'app-auth-state',
  templateUrl: './auth-state.component.html',
  styleUrls: ['./auth-state.component.css']
})
export class AuthStateComponent {

  auth$: Observable<AuthState>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.auth$ = this.store.select('auth');
  }

  
  signIn() {
    this.store.dispatch(new AuthActions.SignIn({ email: null, password: null }));
  }

  signOut() {
    this.store.dispatch(new AuthActions.SignOut());
  }

  // homeScore() {
  //   this.store.dispatch(homeScore());
  // }
  // awayScore() {
  //   this.store.dispatch(awayScore());
  // }
  // resetScore() {
  //   this.store.dispatch(resetScore());
  // }

}
