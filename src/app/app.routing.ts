import { 
    Routes, 
    RouterModule } from '@angular/router';
    
import { 
    LoginComponent,
    HomeComponent, 
    AboutComponent,
    BrandComponent,
    RegisterComponent, 
    ForgotPasswordComponent } from './pages';

const appRoutes: Routes = [
    // { path: '', component: WelcomeComponent },

    /** Redirect to home if no eligable route */
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'brand', component: BrandComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    /* { path: 'forgot-password', component: ForgotPasswordComponent }, */
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
