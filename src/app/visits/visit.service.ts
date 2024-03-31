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
import {Observable} from 'rxjs';
import {Visit} from './visit';
import {environment} from '../../environments/environment';
import {HandleError, HttpErrorHandler} from '../error.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/auth/store/auth.reducer';

@Injectable()
export class VisitService {

  private entityUrl = environment.REST_API_URL + 'visits';
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

  getVisits(): Observable<Visit[]> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.get<Visit[]>(this.entityUrl, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('getVisits', []))
      );
  }

  getVisitById(visitId: string): Observable<Visit> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.get<Visit>(this.entityUrl + '/' + visitId, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('getVisitById', {} as Visit))
      );
  }

  addVisit(visit: Visit): Observable<Visit> {
    const ownerId = visit.pet.ownerId;
    const petId = visit.pet.id;
    const visitsUrl = environment.REST_API_URL + `owners/${ownerId}/pets/${petId}/visits`;
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.post<Visit>(visitsUrl, visit, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('addVisit', visit))
      );
  }

  updateVisit(visitId: string, visit: Visit): Observable<Visit> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.put<Visit>(this.entityUrl + '/' + visitId, visit, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('updateVisit', visit))
      );
  }

  deleteVisit(visitId: string): Observable<number> {
    this.headersState$.subscribe(headers => this.authenticationHeaders = headers);
    return this.http.delete<number>(this.entityUrl + '/' + visitId, { headers: this.authenticationHeaders })
      .pipe(
        catchError(this.handlerError('deleteVisit', 0))
      );

  }

}
