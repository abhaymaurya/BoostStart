import { Injectable }             from '@angular/core';
import { Observable }           from 'rxjs/Observable';
import { AuthService }          from './services/auth.service';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse
}                               from '@angular/common/http';
import { authFreeUrls, urls }   from './globals/routes';
import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { Router }               from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService, private router: Router) {}
    refreshTokenCallInProgress:boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //if its auth free url then just let the request go without authorization header
        if(authFreeUrls.indexOf(req.url)!==-1){
            return next.handle(req);
        }

        //excuding add user route as well
        if(req.url===urls.userUrl && req.method === 'POST'){
            return next.handle(req);
        }

        //prior to everything check on client side if access token is still valid
        //if it is not then refresh it with help of refresh token
        if(!this.authService.isAccessTokenStillValid()){
            return this.refreshAccessToken(req, next);
        }

        //take care if you get 401
        return next.handle(this.addToken(req, localStorage.getItem('accessToken')))
        .catch(error => {
            if (error instanceof HttpErrorResponse) {
                switch ((<HttpErrorResponse>error).status) {
                    case 401:
                    return this.refreshAccessToken(req, next);
                }
            }
            else{
                return Observable.throw(error);
            }
        });
    }

    refreshAccessToken(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.refreshTokenCallInProgress) {
            this.refreshTokenCallInProgress = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);
            return this.authService.refreshLogin().first().flatMap((newToken: any) => {
                if (newToken) {
                    this.tokenSubject.next(newToken);
                    return next.handle(this.addToken(req, newToken));
                }

                // If we don't get a new token, we are in trouble so logout.
                return this.logoutUser();
            })
            .catch(error => {
                // If there is an exception calling 'refreshToken', bad news so logout.
                return this.logoutUser();
            })
            .finally(() => {
                this.refreshTokenCallInProgress = false;
            });
        }
        else {
            return this.tokenSubject
            .filter(token => token != null)
            .take(1)
            .switchMap(token => {
                return next.handle(this.addToken(req, token));
            });
        }
    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }})
    }

    logoutUser() {
        this.authService.logout();
        this.authService.redirectUrl = this.router.url;
        this.router.navigate(['/login']);
        return Observable.throw("");
    }
}
