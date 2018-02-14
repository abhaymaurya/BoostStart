import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService }            from './../../services/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./../sign-up/sign-up.component.css']
})
export class ResetPasswordComponent implements OnInit {

    constructor (
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    password:string;
    email:string;
    token:string;

    ngOnInit() {
        //redirect to dashboard if already logged in
        if ((typeof localStorage.getItem('user') !== "undefined") && (localStorage.getItem('user')!==null)) {
            this.router.navigate(['/dashboard']);
        }

        this.email = this.route.snapshot.paramMap.get('email');
        this.token = this.route.snapshot.paramMap.get('token');
    }

    resetPassword(): void {
        if(!this.email || !this.token || !this.password){
            return;
        }
        this.authService.resetPassword(this.email, this.token, this.password)
        .subscribe(result=>{
            this.router.navigate(['/login']);
        });
    }
}
