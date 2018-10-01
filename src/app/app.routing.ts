import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { DashboardComponent } from './Dashboard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
})