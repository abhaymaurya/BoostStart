import { environment } from './../../environments/environment';

export const urls = {
    heroesUrl: environment.apiUrl+'api/heroes',
    userUrl: environment.apiUrl+'api/users',
    loginUrl: environment.apiUrl+'api/login',
    refreshLogin: environment.apiUrl+'api/refreshLogin',
    sendResetPassworkLink: environment.apiUrl+'api/sendResetPassworkLink',
    resetPassword: environment.apiUrl+'api/resetPassword'
}

export const authFreeUrls = [
    urls.loginUrl,
    urls.refreshLogin,
    urls.sendResetPassworkLink,
    urls.resetPassword
]