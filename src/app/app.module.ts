import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { FormsModule }             from '@angular/forms';
import { AppRoutingModule }        from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule }         from '@angular/material';
import { 
    HttpClientModule, HTTP_INTERCEPTORS 
}                                  from '@angular/common/http';

/* Components */
import { AppComponent }            from './app.component';
import { LoginComponent }          from './components/login/login.component';
import { SignUpComponent }         from './components/sign-up/sign-up.component';
import { HeaderComponent }         from './sub-components/header/header.component';
import { FormLabelComponent }      from './sub-components/form-label/form-label.component';
import { DashboardComponent }      from './components/dashboard/dashboard.component';
import { UserListComponent }       from './components/user-list/user-list.component';
import { UserEditComponent }       from './sub-components/user-edit/user-edit.component';
import { BreadcrumbComponent }     from './sub-components/breadcrumb/breadcrumb.component';
import { ResetPasswordComponent }  from './components/reset-password/reset-password.component';
import { ConfirmDialogComponent }  from './sub-components/confirm-dialog/confirm-dialog.component';

/* Services */
import { MessageService }          from './services/message.service';
import { AuthService }             from './services/auth.service';
import { AuthGuardService }        from './services/auth-guard.service';
import { ErrorHandlerService }     from './services/error-handler.service';
import { UserService }             from './services/user.service';
import { AuthInterceptor }           from './auth-interceptor';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        SignUpComponent,
        HeaderComponent,
        FormLabelComponent,
        UserListComponent,
        UserEditComponent,
        BreadcrumbComponent,
        ResetPasswordComponent,
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    providers: [
        MessageService,
        AuthService,
        ErrorHandlerService,
        UserService,
        AuthGuardService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
