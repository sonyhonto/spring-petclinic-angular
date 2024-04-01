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

import { Injectable } from '@angular/core';
import { Owner } from './owner';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../error.service';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/auth/store/auth.reducer';

@Injectable()
export class OwnerService {
  entityUrl = environment.REST_API_URL + 'owners';
  token$: Observable<string>;
  authenticationHeaders: HttpHeaders;
  headersState$: Observable<HttpHeaders>;

  private readonly handlerError: HandleError;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private store: Store<{ auth: AuthState }>
  ) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
    this.token$ = this.store.select('auth').pipe(map(state => state.token));
    this.headersState$ = this.token$.pipe(map(token => new HttpHeaders(token ? {
      authorization: 'Bearer ' + token 
    } : {})));
  }

  getOwners(): Observable<Owner[]> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http
      .get<Owner[]>(this.entityUrl, { headers: this.authenticationHeaders })
      .pipe(catchError(this.handlerError('getOwners', [])));
  }

  getOwnerById(ownerId: number): Observable<Owner> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http
      .get<Owner>(this.entityUrl + '/' + ownerId, { headers: this.authenticationHeaders })
      .pipe(catchError(this.handlerError('getOwnerById', {} as Owner)));
  }

  addOwner(owner: Owner): Observable<Owner> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http
      .post<Owner>(this.entityUrl, owner, { headers: this.authenticationHeaders })
      .pipe(catchError(this.handlerError('addOwner', owner)));
  }


  updateOwner(ownerId: string, owner: Owner): Observable<{}> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http
      .put<Owner>(this.entityUrl + '/' + ownerId, owner, { headers: this.authenticationHeaders })
      .pipe(catchError(this.handlerError('updateOwner', owner)));
  }

  deleteOwner(ownerId: string): Observable<{}> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http
      .delete<Owner>(this.entityUrl + '/' + ownerId, { headers: this.authenticationHeaders })
      .pipe(catchError(this.handlerError('deleteOwner', [ownerId])));
  }

  searchOwners(lastName: string): Observable<Owner[]> {
    let url = this.entityUrl;
    if (lastName !== undefined) {
      url += '?lastName=' + lastName;
    }
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http
      .get<Owner[]>(url, { headers: this.authenticationHeaders })
      .pipe(catchError(this.handlerError('searchOwners', [])));
  }
}
