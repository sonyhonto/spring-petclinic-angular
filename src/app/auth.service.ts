import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { AuthState } from './auth/store/auth.reducer';
import { Credentials } from './auth/store/credentials';
import { Token } from './auth/store/token';
import { HttpErrorHandler } from './error.service';

@Injectable()
export class AuthService {

    authenticated = false;
    auth$: Observable<AuthState>;

    constructor(
        private http: HttpClient,
        private store: Store<{ auth: AuthState }>,
        private httpErrorHandler: HttpErrorHandler) {

        this.auth$ = this.store.select('auth');
        // this.handlerError = httpErrorHandler.createHandleError('AuthService');
    }

    getToken(credentials: Credentials): Observable<Token> {
        const login_url = 'http://localhost:9966/petclinic/rest/auth/login';
        const headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
        } : {});

        return this.http.post<Token>(login_url, credentials, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

}