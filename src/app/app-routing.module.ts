import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { LoginComponent }         from './components/login/login.component';
import { SignUpComponent }        from './components/sign-up/sign-up.component';
import { DashboardComponent }     from './components/dashboard/dashboard.component';
import { UserListComponent }      from './components/user-list/user-list.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuardService }       from './services/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'reset-password/:email/:token', component: ResetPasswordComponent },
    { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent },
    { path: 'dashboard/userList', component: UserListComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
