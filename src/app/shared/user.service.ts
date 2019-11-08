import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs';
import {User} from './user.model';

@Injectable()
export class UserService {
    readonly rootUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    registerUser(user: User) {
        const body: User = {
            UserName: user.UserName,
            Password: user.Password
        };
        var reqHeader = new HttpHeaders({'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/registration', body, {headers: reqHeader});
    }

    userAuthentication(userName, password) {
        var data = 'username=' + userName + '&password=' + password + '&grant_type=password';
        var reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True'});
        return this.http.post(this.rootUrl + '/login', data, {headers: reqHeader});
    }

    getUserClaims() {
        return this.http.get(this.rootUrl + '/api/GetUserClaims');
    }

}
