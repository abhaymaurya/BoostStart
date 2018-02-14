import { Injectable, Injector } from '@angular/core';
import { Observable }           from 'rxjs/Observable';
import { 
    HttpClient, HttpHeaders, HttpRequest
}                               from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { urls }                 from './../globals/routes';
import { MessageService}        from './message.service';
import { ErrorHandlerService}   from './error-handler.service';
import 'rxjs/add/operator/mergeMap';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

    constructor(
        private injector:Injector,
        private messageService: MessageService,
        private errorHandlerService: ErrorHandlerService
    ) { }
    redirectUrl:string;
    isLoggedIn:boolean = false;

    login (email, password): Observable<any> {
        //please note that injection is needed for HttpClient
        //as otherwise you will run in circular dependency error
        //because of http interceptor which uses auth service
        const http = this.injector.get(HttpClient);
        //add basic header
        httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic '+btoa(email+':'+password));
        return http.post(urls.loginUrl, {}, httpOptions)
        .pipe(
            tap(result => {
                this.messageService.messageLog(`Login Successful`);
                localStorage.setItem('accessToken', result['accessToken']);
                localStorage.setItem('refreshToken', result['refreshToken']);
                localStorage.setItem('accessTokenExpires', result['tokenExpires']);
                localStorage.setItem('user', JSON.stringify(result['user']));
                this.isLoggedIn = true;
            }),
            catchError(this.errorHandlerService.handleError('login', []))
        );
    }

    isAccessTokenStillValid():boolean{
        if (typeof localStorage.getItem('accessTokenExpires') === "undefined") {
          return false;
        }
        const accessTokenExpires = localStorage.getItem('accessTokenExpires');
        // Get the current date at midnight.
        var now = new Date();
        let accessTokenExpiryDate = new Date(accessTokenExpires);
        // Compare the two dates by comparing the millisecond representations.
        if (now.getTime() <= accessTokenExpiryDate.getTime()){
          this.isLoggedIn = true;
            return true;
        }
        return false;
    }

    refreshLogin(): Observable<any> {
        const http = this.injector.get(HttpClient);
        //trying refresh token
        httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer '+localStorage.getItem('refreshToken'));
        return http.post( urls.refreshLogin, {}, httpOptions)
        .pipe(
            tap(result => {
                localStorage.setItem('accessToken', result['accessToken']);
                localStorage.setItem('refreshToken', result['refreshToken']);
                localStorage.setItem('accessTokenExpires', result['tokenExpires']);
            }),
            map(result => result['accessToken']), // returns a {0|1} element array
            catchError(this.errorHandlerService.handleError('refreshLogin', []))
        );
    }

    logout(): void{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessTokenExpires');
        localStorage.removeItem('user');
    }

    sendResetPassworkLink (email): Observable<any> {
        const http = this.injector.get(HttpClient);
        return http.post(urls.sendResetPassworkLink, {email: email}, httpOptions)
        .pipe(
            catchError(
                this.errorHandlerService.handleError('sendResetPassworkLink', [])
            )
        );
    }

    resetPassword (email, token, password): Observable<any> {
        const http = this.injector.get(HttpClient);
        const data = {
            email: email,
            token: token,
            password: password
        }
        return http.post(urls.resetPassword, data, httpOptions)
        .pipe(
            catchError(this.errorHandlerService.handleError('resetPassword', []))
        );
    }
}
