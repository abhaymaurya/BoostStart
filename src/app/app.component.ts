import { Component, OnInit } from '@angular/core';
import { MessageService}     from './services/message.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    message: string;
    error: string;

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        this.messageService.message$.subscribe(message => {
            this.message = message;
            let self = this;
            setTimeout(function(){ self.message=null }, 3000);
        });
        this.messageService.error$.subscribe(error => this.error = error);
    }

    //remove error message
    cancelErrorMessage() {
        this.error = null;
    }
}
