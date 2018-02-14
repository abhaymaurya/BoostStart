import { Injectable }    from '@angular/core';
import { of }            from 'rxjs/observable/of';
import { Observable }    from 'rxjs/Observable';
import { MessageService} from './message.service';

@Injectable()
export class ErrorHandlerService {

    constructor(private messageService: MessageService) { }

    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    public handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // for user consumption
            this.messageService.errorLog(`${operation} failed. Please try again later.`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
