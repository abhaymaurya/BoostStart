import { Component, OnInit }      from '@angular/core';
import { MatDialog }              from '@angular/material';
import { ConfirmDialogComponent } from './../../sub-components/confirm-dialog/confirm-dialog.component';
import { UserService }            from '../../services/user.service';
import { User }                   from '../../structures/user';
import { Observable }             from 'rxjs/Observable';
import { Subject }                from 'rxjs/Subject';
import {
   debounceTime, distinctUntilChanged, switchMap
 }                                from 'rxjs/operators';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    constructor(public dialog: MatDialog, private userService: UserService) { }

    activeUser:User;
    users$: Observable<User[]>;
    users:User[];
    searchValue:string='';
    loggedInUser:User = JSON.parse(localStorage.getItem('user'));
    private searchTerms = new Subject<string>();

    // Push a search term into the observable stream.
    search(): void {
        this.searchTerms.next(this.searchValue);
    }

    ngOnInit(): void {
        this.users$ = this.searchTerms.pipe(
          // wait 300ms after each keystroke before considering the term
          debounceTime(300),

          // ignore new term if same as previous term
          distinctUntilChanged(),

          // switch to new search observable each time the term changes
          switchMap((term: string) => term
                    ?this.userService.searchUsers(term)
                    :this.userService.getUsers())
        );
        // Wait for 100 ms before loading all users ...
        setTimeout(() => {
          this.search();
        }, 100);
        // you could use users$ as well but its easy to manage
        // a normal users than observable so copying
        this.users$.subscribe(
            users => this.users = users
        );
    }

    openDialog(user:User): void {
        let dialogRef = this.dialog.open(ConfirmDialogComponent, {});

        dialogRef.afterClosed().subscribe(choiceYes => {
            if(choiceYes){
                this.delete(user);
            }
        });
    }

    delete(user: User): void {
        this.userService.deleteUser(user).subscribe(result=>{
            this.users = this.users.filter((_user:User)=>_user!==user);
        });
    }

    onNotify(user:User): void {
        user.state = 'inactive';
    }

    cancelEdit(user:User): void{
        //copying back the original data
        for(var key in user){
            user[key] = this.activeUser[key];
        }
    }

    openEdit(user:User): void{
        this.activeUser = Object.assign({}, user);//copy the object being processed
        user.state = 'active';
        this.users.forEach(function(_user){
            if(user!==_user){
                _user.state = 'inactive';
            }
        });
    }
}
