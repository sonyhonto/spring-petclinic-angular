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
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Vet } from './vet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from '../error.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class VetService {

  entityUrl = environment.REST_API_URL + 'vets';

  private readonly handlerError: HandleError;

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
    this.handlerError = httpErrorHandler.createHandleError('OwnerService');
  }

  getVets(): Observable<Vet[]> {
    return this.http.get<Vet[]>(this.entityUrl)
      .pipe(
        catchError(this.handlerError('getVets', []))
      );
  }

  getVetById(vetId: string): Observable<Vet> {
    return this.http.get<Vet>((this.entityUrl + '/' + vetId))
      .pipe(
        catchError(this.handlerError('getVetById', {} as Vet))
      );
  }

  updateVet(vetId: string, vet: Vet): Observable<Vet> {
    return this.http.put<Vet>(this.entityUrl + '/' + vetId, vet)
      .pipe(
        catchError(this.handlerError('updateVet', vet))
      );
  }

  addVet(vet: Vet): Observable<Vet> {
    return this.http.post<Vet>(this.entityUrl, vet)
      .pipe(
        catchError(this.handlerError('addVet', vet))
      );
  }

  deleteVet(vetId: string): Observable<number> {
    return this.http.delete<number>(this.entityUrl + '/' + vetId)
      .pipe(
        catchError(this.handlerError('deleteVet', 0))
      );
  }


  testGetVets(): Observable<Vet[]> {
    let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBMSIsImF1dGhvcml0aWVzIjoiW1JPTEVfQURNSU4sIFJPTEVfT1dORVJfQURNSU4sIFJPTEVfVkVUX0FETUlOXSIsImV4cCI6MTkyNzExNjE4MX0.4tHx6XLeL8DaVVfthO0g-UK2oAOklNIYLSMQB9_kJ-o';

    // const headers = new HttpHeaders(credentials ? {
    //   authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    // } : {});

 
    const headers = new HttpHeaders(token ? {
      authorization: 'Bearer ' + token
    } : {});

    return this.http.get<Vet[]>(this.entityUrl, { headers: headers })
      .pipe(
        catchError(this.handlerError('getVets', []))
      );
  }

}
