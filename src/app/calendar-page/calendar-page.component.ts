import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
    OnInit
} from '@angular/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView
} from 'angular-calendar';
import {EventService} from './service/event.service';
import {Event} from './models/event.model';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {StorageService} from './service/storage.service';
import {RemoteFile} from './models/remote-file.model';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    selector: 'app-test-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './calendar-page.component.html',
    styleUrls: ['./calendar-page.component.less']
})
export class CalendarPageComponent implements OnInit {
    @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData: {
        action: string;
        event: CalendarEvent;
    };

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[];

    eventsFoundByQuery: CalendarEvent[];

    files: RemoteFile[];

    activeDayIsOpen = true;

    searchQuery: string;
    queryChanged = new Subject<string>();

    constructor(private modal: NgbModal, private eventService: EventService, private storageService: StorageService) {
    }

    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0);
            this.viewDate = date;
        }
    }

    eventTimesChanged({
                          event,
                          newStart,
                          newEnd
                      }: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map(iEvent => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = {event, action};
        this.modal.open(this.modalContent, {size: 'lg'});
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            }
        ];
        console.log(this.events);
    }

    private addNewEvent(id: string | number, title: string, start: Date, end: Date) {
        this.events = [
            ...this.events,
            {
                id,
                title,
                start: startOfDay(new Date(start)),
                end: endOfDay(new Date(end)),
                color: colors.red,
            }
        ];
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    /*TODO: при сохранении ивента, нужно вернуть её с сервера и обновить текущие значения (id)*/
    commitEvent(event: CalendarEvent<any>) {
        this.eventService.save(event.id, event.title, event.start, event.end)
            .subscribe(value => {
                if (value.statusText === 'Saved') {
                    alert('Event has been saved');
                }
            });
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.eventService.delete(eventToDelete.id).subscribe(value => {
            if (value.statusText === 'Deleted') {
                alert('Event has been deleted');
            }
        });
        this.events = this.events.filter(event => event !== eventToDelete);
    }

    ngOnInit(): void {
        this.events = [];
        this.files = [];
        this.findAllEvents();
        this.storageService.getAll()
            .subscribe(data => {
                data.forEach(file => {
                    this.addNewFile(file.eventId, file.url, file.filename);
                });
            });

        this.queryChanged.pipe(
            debounceTime(1000),
            distinctUntilChanged())
            .subscribe(title => this.eventService.search(title)
                .subscribe(val => {
                    this.events = [];
                    val.forEach(value => {
                        this.addNewEvent(value.id, value.title, value.start, value.end);
                    });
                }));
    }

    private findAllEvents() {
        this.eventService.getAll()
            .subscribe(data => {
                data.forEach(value => {
                    this.addNewEvent(value.id, value.title, value.start, value.end);
                });
            });
    }

    changed(query: string) {
        if (query.trim() === '') {
            this.events = [];
            this.findAllEvents();
            return;
        }
        this.queryChanged.next(query);
    }

    onFileChoose(fileInput: any, id: string | number) {
        const file = fileInput.target.files[0];
        console.log(file);
        this.storageService
            .postFile(file, id)
            .subscribe(remoteFile => {
                this.addNewFile(remoteFile.eventId, remoteFile.url, remoteFile.filename);
            });
    }

    getFilesByEvent(id: string | number) {
        return this.files.filter(value => value.eventId === id);
    }

    private addNewFile(eventId: string | number, url: string, filename: string) {
        this.files = [
            ...this.files,
            {
                url,
                filename,
                eventId
            }
        ];
    }
}
