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
export class VetService implements OnInit {

  entityUrl = environment.REST_API_URL + 'vets';
  auth$: Observable<AuthState>;

  // token: Observable<string>;
  token: string;

  token2$: Observable<string>;
  token2: string;
  
  authenticationHeaders: HttpHeaders;
  authenticationHeaders2: HttpHeaders;

  token$: Observable<string>;
  authenticationHeadersObservable$: Observable<HttpHeaders>;

  // do token and authenticcccationHeaders as 
  // observable

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler,
    private store: Store<{ auth: AuthState }>) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');

    this.store.select('auth').subscribe(state => this.token = state.token);

    this.token2$ = this.store.select('auth').pipe(map(state => state.token));
    this.token$ = this.store.select('auth').pipe(map(state => state.token));

    const token1$: Observable<string> = this.store.select('auth').pipe(map(state => state.token));
    const authenticationHeadersObservable1$: Observable<HttpHeaders> = token1$.pipe(map(token => new HttpHeaders(this.token ? {
      authorization: 'Bearer ' + this.token 
    } : {})));


    this.authenticationHeaders = new HttpHeaders(this.token ? {
      authorization: 'Bearer ' + this.token 
    } : {});

    this.authenticationHeadersObservable$ = this.token$.pipe(map(token => new HttpHeaders(this.token ? {
      authorization: 'Bearer ' + this.token 
    } : {})));

    // this.authenticationHeadersObservable$ = of(new HttpHeaders(this.token ? {
    //   authorization: 'Bearer ' + this.token
    // } : {}));
  }

  ngOnInit(): void {
    this.auth$ = this.store.select('auth');
  }

  getVets(): Observable<Vet[]> {
    // this.auth$.subscribe(state => state.token);
    this.store.select('auth').subscribe(state => this.token = state.token);
    console.log("current token : ", this.token);

    this.token2$.subscribe(token2 => this.token2 = token2);
    console.log("current token 2 : ", this.token2);

    // return this.http.get<Vet[]>(this.entityUrl, { headers: this.authenticationHeaders })
    this.authenticationHeadersObservable$.subscribe(headers => this.authenticationHeaders2 = headers)
    return this.http.get<Vet[]>(this.entityUrl, { headers: this.authenticationHeaders2 })

      .pipe(
        catchError(this.handlerError('getVets', []))
      );
  }

  getVetById(vetId: string): Observable<Vet> {
    return this.http.get<Vet>((this.entityUrl + '/' + vetId), { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('getVetById', {} as Vet))
      );
  }

  updateVet(vetId: string, vet: Vet): Observable<Vet> {
    return this.http.put<Vet>(this.entityUrl + '/' + vetId, vet, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('updateVet', vet))
      );
  }

  addVet(vet: Vet): Observable<Vet> {
    return this.http.post<Vet>(this.entityUrl, vet, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('addVet', vet))
      );
  }

  deleteVet(vetId: string): Observable<number> {
    return this.http.delete<number>(this.entityUrl + '/' + vetId, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('deleteVet', 0))
      );
  }

}
