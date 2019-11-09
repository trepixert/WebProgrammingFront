import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {TokenPair} from '../shared/auth.model';
import * as moment from 'moment';
import * as jwt_decode from 'jwt-decode';

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
            .post<TokenPair>(`${this.apiUrl}/registration`, {username, password, events}, this.httpOptions)
            .pipe(
                tap(val => this.setSession(val)),
            );
    }

    signIn(username: string, password: string) {
        return this.http
            .post<TokenPair>(`${this.apiUrl}/authenticate`, {username, password}, this.httpOptions)
            .pipe(
                tap(val => this.setSession(val)),
            );
    }

    refresh() {
        const refreshToken = localStorage.getItem('refreshToken');
        return this.http
            .post<TokenPair>(`${this.apiUrl}/auth/refresh`, {refreshToken}, this.httpOptions)
            .pipe(
                tap(val => this.setSession(val)),
            );
    }

    signOut() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    isLoggedIn() {
        return localStorage.getItem('accessToken') != null && !this.isExpired();
    }

    isExpired() {
        const expiredAt = JSON.parse(localStorage.getItem('accessExpiredAt'));
        return moment() >= moment(expiredAt);
    }

}
