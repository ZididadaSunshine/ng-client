import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
// import {} from './pages';

const appRoutes: Routes = [
    // { path: '', component: WelcomeComponent },

    /** Redirect to home if no eligable route */
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
