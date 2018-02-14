import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs/Observable';
import { of }                      from 'rxjs/observable/of';
import { MessageService }          from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap }    from 'rxjs/operators';
import { urls }                    from './../globals/routes';
import { User }                    from './../structures/user';
import { ErrorHandlerService}      from './error-handler.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    constructor(private http: HttpClient, private messageService: MessageService,private errorHandlerService: ErrorHandlerService) { }
    private userUrl = urls.userUrl;  // URL to api

    private addState(users){
        for(var key in users){
            users[key].state = 'inactive';
        }
        return users;
    }

    /** POST: add a new User to the server */
    addUser(user:User): Observable<User> {
        return this.http.post<User>(this.userUrl, user, httpOptions)
        .pipe(
            tap((user: User) => this.messageService.messageLog(`Added User w/ id=${user.id}`)),
            catchError(this.errorHandlerService.handleError<User>('addUser'))
        );
    }

    /** GET Users from the server */
    getUsers (): Observable<User[]> {
        return this.http.get<User[]>(this.userUrl)
        .pipe(
            map(users => this.addState(users)),
            tap(users => this.messageService.messageLog(`Listing all users`)),
            catchError(this.errorHandlerService.handleError('getUsers', []))
        );
    }


    /** DELETE: delete the User from the server */
    deleteUser (user: User | number): Observable<User> {
        const id = typeof user === 'number' ? user : user.id;
        const url = `${this.userUrl}/${id}`;

        return this.http.delete<User>(url, httpOptions)
        .pipe(
            tap(_ => this.messageService.messageLog(`Deleted User id=${id}`)),
            catchError(this.errorHandlerService.handleError<User>('deleteUser'))
        );
    }


    /** PUT: update the User on the server */
    updateUser (user: User): Observable<any> {
        return this.http.put(this.userUrl, user, httpOptions)
        .pipe(
            tap(_ => this.messageService.messageLog(`Updated User id=${user.id}`)),
            catchError(this.errorHandlerService.handleError<any>('updateUser'))
        );
    }


    /* GET users whose name contains search term */
    searchUsers(term: string): Observable<User[]> {
        if (!term.trim()) {
            // if not search term, return empty user array.
            return of([]);
        }
        return this.http.get<User[]>(`${this.userUrl}?search=${term}`)
        .pipe(
            map(users => this.addState(users)),
            tap(_ => this.messageService.messageLog(`Found users matching "${term}"`)),
            catchError(this.errorHandlerService.handleError<User[]>('searchUsers', []))
        );
    }
}
