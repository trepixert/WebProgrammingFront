import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {CalendarPageModule} from './calendar-page/calendar-page.module';

import {LandingPageComponent} from './landing-page/landing-page.component';
import {AuthGuardService} from './auth/services/auth-guard.service';

const appRoutes: Routes = [
    {path: 'home', component: LandingPageComponent},
    {path: 'calendar', loadChildren: () => import('./calendar-page/calendar-page.module').then(m => m.CalendarPageModule)},
    {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
