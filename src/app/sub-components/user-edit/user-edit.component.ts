import { 
    Component, OnInit, Input, Output, EventEmitter
}                                    from '@angular/core';
import { SlideInOutAnimation }       from './user-edit-animation';
import { UserService }               from './../../services/user.service';
import { User }                      from './../../structures/user';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css'],
    animations: [SlideInOutAnimation]
})
export class UserEditComponent implements OnInit {
    @Input() user:User;
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();

    constructor(private userService: UserService) { }

    ngOnInit() {
    }

    updateUser(): void {
        this.userService.updateUser(this.user)
        .subscribe(user => {
           this.notify.emit(this.user);
        });
    }
}
