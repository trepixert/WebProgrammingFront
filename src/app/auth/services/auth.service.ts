import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {TokenPair} from '../models/auth.model';

@Injectable()
export class AuthService {
    apiUrl = environment.apiUrl;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
    }

    setSession(tokens: TokenPair) {
        localStorage.setItem('accessToken', tokens.accessToken);
    }

    signUp(username: string, password: string) {
        const events = [];
        return this.http
            .post<Response>(`${this.apiUrl}/registration`, {username, password, events}, this.httpOptions)
    }

    signIn(username: string, password: string) {
        return this.http
            .post<TokenPair>(`${this.apiUrl}/authenticate`, {username, password}, this.httpOptions)
            .pipe(
                tap(val => this.setSession(val)),
            );
    }

    signOut() {
        localStorage.removeItem('accessToken');
    }

    isLoggedIn() {
        return localStorage.getItem('accessToken') != null;
    }

}
