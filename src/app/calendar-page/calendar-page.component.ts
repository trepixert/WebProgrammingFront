import {Component, OnInit} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import * as $ from 'jquery';

@Component({
    selector: 'app-calendar-page',
    templateUrl: './calendar-page.component.html',
    styleUrls: ['./calendar-page.component.less']
})
export class CalendarPageComponent implements OnInit {
    calendarPlugins = [dayGridPlugin];
    ngOnInit() {
    }

    eventClick(model) {
        console.log(model);
    }

    eventRender(eventObj) {
        /*console.log(eventObj.el);
        const description = eventObj.description;
/!*        const start = eventObj.start.toDate(undefined, undefined).toTimeString().substr(0, 5);
        const end = eventObj.end.toDate(undefined, undefined).toTimeString().substr(0, 5);
        const descriptionString = description + '\n С: ' + start + ' \n По: ' + end;*!/
        eventObj.el.popover({
            title: eventObj.title,
            content: description,
            trigger: 'hover',
            placement: 'top',
            container: 'body'
        });*/
    }

    openModel() {
        $('.modal').modal('show');
    }
}
