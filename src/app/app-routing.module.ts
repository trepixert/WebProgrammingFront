import {RouterModule, Routes} from '@angular/router';


import {LandingPageComponent} from './landing-page/landing-page.component';
import {UserComponent} from './user/user.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {AuthGuard} from './auth/auth.guard';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';
import {NgModule} from '@angular/core';

export const appRoutes: Routes = [
    {path: 'home', component: LandingPageComponent},
    // {path: 'calendar', component: CalendarPageComponent, canActivate: [AuthGuard]},
    {path: 'calendar', loadChildren: './calendar-page/calendar-page.module#CalendarPageModule'},
    {
        path: 'signup', component: UserComponent,
        children: [{path: '', component: SignUpComponent}]
    },
    {
        path: 'login', component: UserComponent,
        children: [{path: '', component: SignInComponent}]
    },
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
    exports: [RouterModule]
})
export class AppRoutingModule {
}
