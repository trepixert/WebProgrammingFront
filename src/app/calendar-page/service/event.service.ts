import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CalendarEvent} from 'calendar-utils';
import {Event} from '../models/event.model';

@Injectable()
export class EventService {
    apiUrl = environment.apiUrl;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        })
    };

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<CalendarEvent[]> {
        return this.http.get<CalendarEvent[]>(this.apiUrl + `/events`, this.httpOptions);
    }

    save(id: string | number, title: string, start: Date, end: Date): Observable<Response> {
        return this.http.post<Response>(this.apiUrl + `/events/create`, {id, title, start, end}, this.httpOptions);
    }

    delete(id: string | number): Observable<Response> {
        return this.http.delete<Response>(this.apiUrl + `/events/delete/${id}/`, this.httpOptions);
    }
}
