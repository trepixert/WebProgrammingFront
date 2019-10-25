import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';

const appRoutes: Routes = [
    {path: 'home', component: LandingPageComponent},
    {path: 'calendar', component: CalendarPageComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        CalendarPageComponent
    ],
    imports: [
        BrowserModule,
        FullCalendarModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
