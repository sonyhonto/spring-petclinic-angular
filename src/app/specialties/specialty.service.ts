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
import {Specialty} from './specialty';
import {catchError, map} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '../error.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthState } from 'app/auth/store/auth.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class SpecialtyService {

  private entityUrl = environment.REST_API_URL + 'specialties';
  token$: Observable<string>;
  authenticationHeaders: HttpHeaders;
  headersState$: Observable<HttpHeaders>;

  private handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler,
    private store: Store<{ auth: AuthState }>) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
    this.token$ = this.store.select('auth').pipe(map(state => state.token));
    this.headersState$ = this.token$.pipe(map(token => new HttpHeaders(token ? {
      authorization: 'Bearer ' + token 
    } : {})));
  }

  getSpecialties(): Observable<Specialty[]> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.get<Specialty[]>(this.entityUrl, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('getSpecialties', []))
      );
  }

  getSpecialtyById(specId: string): Observable<Specialty> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.get<Specialty>((this.entityUrl + '/' + specId), { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('getSpecialtyById', {} as Specialty))
      );
  }

  addSpecialty(specialty: Specialty): Observable<Specialty> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.post<Specialty>(this.entityUrl, specialty, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('addSpecialty', specialty))
      );
  }

  updateSpecialty(specId: string, specialty: Specialty): Observable<Specialty> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.put<Specialty>((this.entityUrl + '/' + specId), specialty, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('updateSpecialty', specialty))
      );
  }

  deleteSpecialty(specId: string): Observable<number> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.delete<number>((this.entityUrl + '/' + specId), { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('deleteSpecialty', 0))
      );
  }

}
