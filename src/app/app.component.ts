import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-root',
  templateUrl: './calendar-page/calendar-page.component.html',
  styleUrls: ['./calendar-page/calendar-page.component.less']
})
export class AppComponent {
  title = 'WebProgrammingFront';
  calendarPlugins = [dayGridPlugin]; // important!

}
