import { Component, OnInit } from '@angular/core';
import { AuthService }       from './../../services/auth.service';
import { Router }            from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./../sign-up/sign-up.component.css']
})
export class LoginComponent implements OnInit {
    email:string;
    password:string;
    forgotPassword:boolean = false;
    title:string = 'Login Form';

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        //redirect to dashboard if already logged in
        if ((typeof localStorage.getItem('user') !== "undefined") && (localStorage.getItem('user')!==null)) {
            this.router.navigate(['/dashboard']);
        }
    }

    login(): void{
        this.authService.login(this.email, this.password)
        .subscribe(result=>{
            if ((typeof this.authService.redirectUrl !== "undefined") && (this.authService.redirectUrl !== null)) {
                this.router.navigate([this.authService.redirectUrl]);
                this.authService.redirectUrl = null;
                return;
            }
            //go to dashboard only if successfull response came
            if (result.accessToken) {
                this.router.navigate(['/dashboard']);
            }
        });
    }

    sendResetPassworkLink(): void{
        if (!this.email) {
            return;
        }
        this.authService.sendResetPassworkLink(this.email).subscribe();
    }
}
