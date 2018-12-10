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
import { BrandsComponent } from './pages/brands/brands.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const appRoutes: Routes = [
    // { path: '', component: WelcomeComponent },

    /** Redirect to home if no eligable route */
    { path: '', component: HomeComponent, canActivate: [AuthorizationGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthorizationGuard] },
    { path: 'brands', component: BrandsComponent, canActivate: [AuthorizationGuard] },
    { path: 'brands/:id', component: BrandComponent, canActivate: [AuthorizationGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
];

export const Routing = RouterModule.forRoot(appRoutes);
