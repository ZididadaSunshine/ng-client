import {
    Routes,
    RouterModule} from '@angular/router';

import {
    LoginComponent,
    HomeComponent,
    AboutComponent,
    BrandComponent,
    RegisterComponent } from './pages';

import { AuthorizationGuard } from './guards';

const appRoutes: Routes = [
    // { path: '', component: WelcomeComponent },

    /** Redirect to home if no eligable route */
    { path: '', component: HomeComponent, canActivate: [AuthorizationGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthorizationGuard] },
    { path: 'brand', component: BrandComponent, canActivate: [AuthorizationGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    /* { path: 'forgot-password', component: ForgotPasswordComponent }, */
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
