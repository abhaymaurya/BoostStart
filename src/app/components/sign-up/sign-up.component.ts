import { Component, OnInit } from '@angular/core';
import { UserService }       from '../../services/user.service';
import { Router }            from '@angular/router';
import { User }              from '../../structures/user';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    user:User={
        id: null,
        name:'',
        email:'',
        password:''
    };
    confirmPassword: string;
    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        //redirect to dashboard if already logged in
        if ((typeof localStorage.getItem('user') !== "undefined") && (localStorage.getItem('user')!==null)) {
            this.router.navigate(['/dashboard']);
        }
    }

    signUp(): void {
        this.user.name = (typeof this.user.name!=="undefined")?this.user.name.trim():null;
        this.user.email = this.user.email.trim();
        this.user.password = this.user.password.trim();
        if (!this.user.email || !this.user.password) { return; }
        this.userService.addUser(this.user)
        .subscribe(result => {
            this.router.navigate(['/login']);
        });
    }
}
