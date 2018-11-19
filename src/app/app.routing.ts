import { LoginComponent } from './pages/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BrandComponent } from './pages/brand/brand.component';
// import {} from './pages';

const appRoutes: Routes = [
    // { path: '', component: WelcomeComponent },

    /** Redirect to home if no eligable route */
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'brand', component: BrandComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
