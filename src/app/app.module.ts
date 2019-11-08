import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FullCalendarModule} from '@fullcalendar/angular'; // for FullCalendar!
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {HeaderPageComponent} from './header-page/header-page.component';
import {appRoutes} from './app-routing.module';
import {CalendarPageComponent} from './calendar-page/calendar-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserComponent} from './user/user.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {RouterModule} from '@angular/router';
import {AuthInterceptor} from './auth/auth.interceptor';
import {AuthGuard} from './auth/auth.guard';
import {UserService} from './shared/user.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderPageComponent,
        LandingPageComponent,
        UserComponent,
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
    exports: [
        HeaderPageComponent,
    ],
    providers: [UserService, AuthGuard, {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }],
    bootstrap: [AppComponent],
})
export class AppModule {
}
