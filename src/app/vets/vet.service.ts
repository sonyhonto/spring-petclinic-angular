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

import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Vet } from './vet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from '../error.service';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/auth/store/auth.reducer';


@Injectable()
export class VetService {

  entityUrl = environment.REST_API_URL + 'vets';
  token$: Observable<string>;
  authenticationHeaders: HttpHeaders;
  headersState$: Observable<HttpHeaders>;

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler,
    private store: Store<{ auth: AuthState }>) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
    this.token$ = this.store.select('auth').pipe(map(state => state.token));
    this.headersState$ = this.token$.pipe(map(token => new HttpHeaders(token ? {
      authorization: 'Bearer ' + token 
    } : {})));
  }

  getVets(): Observable<Vet[]> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.get<Vet[]>(this.entityUrl, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('getVets', []))
      );
  }

  getVetById(vetId: string): Observable<Vet> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.get<Vet>((this.entityUrl + '/' + vetId), { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('getVetById', {} as Vet))
      );
  }

  updateVet(vetId: string, vet: Vet): Observable<Vet> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.put<Vet>(this.entityUrl + '/' + vetId, vet, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('updateVet', vet))
      );
  }

  addVet(vet: Vet): Observable<Vet> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.post<Vet>(this.entityUrl, vet, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('addVet', vet))
      );
  }

  deleteVet(vetId: string): Observable<number> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.delete<number>(this.entityUrl + '/' + vetId, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('deleteVet', 0))
      );
  }

}
