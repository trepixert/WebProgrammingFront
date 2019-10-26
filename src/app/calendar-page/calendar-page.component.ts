import {Component, OnInit} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-calendar-page',
    templateUrl: './calendar-page.component.html',
    styleUrls: ['./calendar-page.component.less']
})
export class CalendarPageComponent implements OnInit {
    calendarPlugins = [dayGridPlugin];
    ngOnInit() {
    }
}
