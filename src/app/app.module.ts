import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!

import {AppComponent} from './app.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {HeaderPageComponent} from './header-page/header-page.component';
import {AppRoutingModule} from './app-routing.module';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';
import { TestComponent } from './test/test.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderPageComponent,
        LandingPageComponent,
        TestComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    exports: [
      HeaderPageComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
