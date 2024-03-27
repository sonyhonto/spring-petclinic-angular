import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthState } from './auth/store/auth.reducer';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { Token } from './auth/store/token';
import { HandleError, HttpErrorHandler } from './error.service';
import { catchError, map } from 'rxjs/operators';
import { Credentials } from './auth/store/credentials';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {

    // entityUrl = environment.REST_API_URL;
    // REST_API_URL: 'http://localhost:9966/petclinic/api/'

    authenticated = false;
    auth$: Observable<AuthState>;

    // private readonly handlerError: HandleError;

    constructor(
        private http: HttpClient,
        private store: Store<{ auth: AuthState }>,
        private httpErrorHandler: HttpErrorHandler) {

        this.auth$ = this.store.select('auth');
        // this.handlerError = httpErrorHandler.createHandleError('AuthService');
    }

    // registerAccount()

    // signUp
    testRequest(user: Credentials) {

        const signin_url = 'http://localhost:9966/petclinic/rest/auth/register';

        const credentials =
        {
            "usernamemail": user.email,
            "password": user.password,
            "roles": ["ADMIN"]
        };

        this.http.post(signin_url, credentials, {})
            .pipe(
                catchError(this.handleError)
            )
            .subscribe(response => {
                console.log("response .... .... .... ", response);

                // response => console.log(response),
                // error => console.log("Something exploded, call 911"));
            });

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