import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
 
@Injectable()
export class MessageService {
    // Observable string sources
    private message = new Subject<string>();
    private error = new Subject<string>();
    // Observable string streams
    message$ = this.message.asObservable();
    error$ = this.error.asObservable();

    messageLog (message) {
        this.message.next(message);
    }

    errorLog (error) {
        this.error.next(error);
    }
}