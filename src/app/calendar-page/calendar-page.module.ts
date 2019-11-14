import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CalendarPageComponent} from './calendar-page.component';
import {FlatpickrModule} from 'angularx-flatpickr';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {EventService} from './service/event.service';


const ROUTES: Routes = [
    {path: '', component: CalendarPageComponent}
];

@NgModule({
    declarations: [
        CalendarPageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        NgbModalModule,
        FormsModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        })
    ],
    providers: [EventService],
    exports: [CalendarPageComponent]
})
export class CalendarPageModule {
}
