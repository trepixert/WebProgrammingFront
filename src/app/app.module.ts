import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {HeaderPageComponent} from './header-page/header-page.component';
import {AppRoutingModule} from './app-routing.module';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderPageComponent,
        LandingPageComponent,
        UserComponent,
        SignInComponent,
        SignUpComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
      HeaderPageComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
