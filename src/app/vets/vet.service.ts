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
import { Observable } from 'rxjs';
import { Vet } from './vet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from '../error.service';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/auth/store/auth.reducer';


@Injectable()
export class VetService implements OnInit {

  entityUrl = environment.REST_API_URL + 'vets';
  auth$: Observable<AuthState>;


  // token: Observable<string>;
  token: string;
  
  authenticationHeaders: HttpHeaders;

  // do token and authenticcccationHeaders as 
  // observable

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler,
    private store: Store<{ auth: AuthState }>) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');

    this.store.select('auth').subscribe(state => this.token = state.token);
    this.authenticationHeaders = new HttpHeaders(this.token ? {
      authorization: 'Bearer ' + this.token
    } : {});
  }

  ngOnInit(): void {
    this.auth$ = this.store.select('auth');
  }

  getVets(): Observable<Vet[]> {
    // this.auth$.subscribe(state => state.token);
    this.store.select('auth').subscribe(state => this.token = state.token);
    console.log("current token : ", this.token);

    return this.http.get<Vet[]>(this.entityUrl, { headers: this.authenticationHeaders })
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
