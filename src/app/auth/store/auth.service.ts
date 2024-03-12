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
import { environment } from '../../../environments/environment';
import { HandleError, HttpErrorHandler } from 'app/error.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface AuthAPI {
    id: number;
    firstName: string;
    lastName: string;
}


@Injectable()
export class AuthService {

    entityUrl = environment.REST_API_URL + 'auth';


    private readonly handlerError: HandleError;

    constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
        this.handlerError = httpErrorHandler.createHandleError('');
    }

    getVets(): void { }


    getAuth(): Observable<AuthAPI> {
        return this.http.get<AuthAPI>(this.entityUrl)
            .pipe(
                catchError(this.handlerError('', {} as AuthAPI))
            );
    }

}
