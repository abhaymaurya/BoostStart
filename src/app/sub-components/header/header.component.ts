import { Component, OnInit, Input } from '@angular/core';
import { AuthService }              from './../../services/auth.service';
import { Router }                   from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Input() login:boolean = false;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    logout(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}