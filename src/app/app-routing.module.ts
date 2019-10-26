import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {LandingPageComponent} from './landing-page/landing-page.component';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';
import {TestComponent} from './test/test.component';

const routes: Routes = [
    {path: 'home', component: LandingPageComponent},
    {path: 'calendar', loadChildren: './calendar-page/calendar-page.module#CalendarPageModule'},
    {path: 'test', component: TestComponent},

    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
