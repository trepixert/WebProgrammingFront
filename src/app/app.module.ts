import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';


import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './auth/interceptors/auth-interceptor';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SharedModule} from './shared/shared.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { WebhookComponent } from './webhook/webhook.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        WebhookComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        CommonModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
