import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthState } from './auth/store/auth.reducer';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { Token } from './auth/store/token';
import { HandleError, HttpErrorHandler } from './error.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {

    // entityUrl = environment.REST_API_URL;
    // REST_API_URL: 'http://localhost:9966/petclinic/api/'

    authenticated = false;
    auth$: Observable<AuthState>;

    private readonly handlerError: HandleError;

    constructor(
        private http: HttpClient,
        private store: Store<{ auth: AuthState }>,
        private httpErrorHandler: HttpErrorHandler) {

        this.auth$ = this.store.select('auth');
        this.handlerError = httpErrorHandler.createHandleError('OwnerService');
    }

    // authenticate(credentials, callback) {

    //     const headers = new HttpHeaders(credentials ? {
    //         authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    //     } : {});

    //     // this.http.get('user', {headers: headers}).subscribe(response => {
    //     this.http.get('auth/signup', { headers: headers }).subscribe(response => {

    //         if (response['name']) {
    //             this.authenticated = true;
    //         } else {
    //             this.authenticated = false;
    //         }
    //         return callback && callback();
    //     });

    // }

    getToken(): Observable<Token> {
        const login_url = 'http://localhost:9966/petclinic/rest/auth/login';

        const credentials = {
            email: 'A1',
            password: '12'
        };

        // {
        //     "email": "A1",
        //     "password": "12" 
        // }

        const headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.email + ':' + credentials.password)
        } : {});

        return this.http.post<Token>(login_url, credentials, {headers: headers})
            .pipe(
                catchError(this.handlerError('getToken', {} as Token))
            );
    }

}