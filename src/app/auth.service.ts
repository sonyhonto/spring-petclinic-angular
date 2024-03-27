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

    signUp(credentials: Credentials) {
        // const signin_url = 'http://localhost:9966/petclinic/api/auth/signup';

        const signin_url = 'http://localhost:9966/petclinic/rest/auth/register_test';

        const user =
        {
            "usernamemail": credentials.email, //"V50",
            "password": credentials.password, //12,
            "roles": ["ADMIN"]
        };

        const headers = new HttpHeaders(
            // credentials ? {
            // authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
            // } : {}
        );

        // return this.http.post<Token>(signin_url, credentials, {})
        // return this.http.post(signin_url, credentials, { headers: headers })

        // return this.http.post(signin_url, credentials, {})
        //     .pipe(
        //         catchError(this.handleError)
        //     );

        // return this.http.post(signin_url, credentials, {})
        // .do(
        //     response => console.log("logging response both bad and ok..."), 
        //     error => console.log("Something exploded, call 911"))

        return this.http.get(signin_url)
            .subscribe(
                response => console.log(response),
                error => console.log("Something exploded, call 911"));

        // .subscribe(data => { console.log(data) })
        // .pipe(
        //     // catchError(this.handleError)
        //     map(response => {response})
        // )
        ;
    }

    testRequest() {

        // const credentials =       {
        //     email: this.signUpForm.value.email,
        //     password: this.signUpForm.value.passwordGroup.newPassword,
        //   }

        console.log("console ... log ... ");

        // const signin_url = 'http://localhost:9966/petclinic/rest/auth/register_test';

        // this.http.get(signin_url, { headers: {} })
        // // this.http.get(signin_url)
        //     .subscribe(
        //         response => console.log(response),
        //         error => console.log("Something exploded, call 911"));


        // const signin_url = 'http://localhost:9966/petclinic/rest/auth/login';
        // const signin_url = 'http://localhost:9966/petclinic/rest/auth/register_test';

        // const credentials = {
        //     email: 'A1',
        //     password: '12',
        // }

        // const headers = new HttpHeaders(credentials ? {
        //     authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
        // } : {});

        // this.http.get<string>(signin_url, { headers: headers })
        //     // this.http.get(signin_url)
        //     // .subscribe(
        //     //     response => console.log(response),
        //     //     error => console.log("Something exploded, call 911"));
        //     .pipe(
        //         catchError(this.handleError)
        //     )
        //     .subscribe(response => {
        //         console.log("response .... .... .... ", response);
        //     });

        const signin_url = 'http://localhost:9966/petclinic/rest/auth/register_test_post';
        const credentials = {
            email: 'A1',
            password: '12',
        }
        const headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
        } : {});
        this.http.post<string>(signin_url, { headers: headers })
            .pipe(
                catchError(this.handleError)
            )
            .subscribe(response => {
                console.log("response .... .... .... ", response);
            });



        // const credentials = {
        //     email: 'A1',
        //     password: '12',
        // }

        // const login_url = 'http://localhost:9966/petclinic/rest/auth/login';
        // const headers = new HttpHeaders(credentials ? {
        //     authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
        // } : {});

        // this.http.post<Token>(login_url, credentials, { headers: headers })
        //     .pipe(
        //         catchError(this.handleError)
        //     )
        //     .subscribe(response => {
        //         console.log("response .... .... .... ", response);
        //     });
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