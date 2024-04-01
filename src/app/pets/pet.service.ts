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

import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Pet} from './pet';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../error.service';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/auth/store/auth.reducer';

@Injectable()
export class PetService {

  private entityUrl = environment.REST_API_URL + 'pets';
  token$: Observable<string>;
  authenticationHeaders: HttpHeaders;
  headersState$: Observable<HttpHeaders>;

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler,
    private store: Store<{ auth: AuthState }>) {
    this.handlerError = httpErrorHandler.createHandleError('PetService');
    this.token$ = this.store.select('auth').pipe(map(state => state.token));
    this.headersState$ = this.token$.pipe(map(token => new HttpHeaders(token ? {
      authorization: 'Bearer ' + token 
    } : {})));
  }

  getPets(): Observable<Pet[]> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.get<Pet[]>(this.entityUrl, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('getPets', []))
      );
  }

  getPetById(petId: number): Observable<Pet> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.get<Pet>(this.entityUrl + '/' + petId, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('getPetById', {} as Pet))
      );
  }

  addPet(pet: Pet): Observable<Pet> {
    const ownerId = pet.owner.id;
    const ownersUrl = environment.REST_API_URL + `owners/${ownerId}/pets`;
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.post<Pet>(ownersUrl, pet, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('addPet', pet))
      );
  }

  updatePet(petId: string, pet: Pet): Observable<Pet> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.put<Pet>(this.entityUrl + '/' + petId, pet, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('updatePet', pet))
      );
  }

  deletePet(petId: string): Observable<number> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.delete<number>(this.entityUrl + '/' + petId, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('deletePet', 0))
      );
  }

}
