import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrl} from '../../../environments/environment';
import {CalendarEvent} from 'calendar-utils';

@Injectable()
export class EventService {
    apiUrl = apiUrl;
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
        return this.http.get<Response>(this.apiUrl + `/events/delete/${id}`, this.httpOptions);
    }

    search(query: string): Observable<CalendarEvent[]> {
        return this.http.get<CalendarEvent[]>(`${this.apiUrl}/events/search?title=${query.trim()}`, this.httpOptions);
    }

}
