/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/**
 * @author Vitaliy Fedoriv
 */

import {Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './auth/store/auth.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  isAthenticated: boolean = false;

  constructor(private store: Store<{ auth: AuthState }>,
    private router: Router) {

    this.store.select('auth').subscribe(state => {
      this.isAthenticated = state.authenticated;
    });
    
    // this.token$ = this.store.select('auth').pipe(map(state => state.token));

    // this.headersState$ = this.token$.pipe(map(token => new HttpHeaders(token ? {
    //   authorization: 'Bearer ' + token
    // } : {})));
  }

  setAuthenticated() {
    this.isAthenticated = true;
  }

  setLogout() {
    this.isAthenticated = false;
    this.store.dispatch(new AuthActions.SignOut());
    this.router.navigate(['/welcome']);
  }
}
