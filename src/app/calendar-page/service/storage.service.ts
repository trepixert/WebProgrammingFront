import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RemoteFile} from '../models/remote-file.model';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private apiUrl = `https://web-programming-agliullin-back.herokuapp.com/storage`;
    private fileKey = 'file';

    httpOptions = {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        })
    };

    constructor(private http: HttpClient) {
    }

    postFile(file: File, id: string | number): Observable<RemoteFile> {
        const formData = new FormData();
        formData.append(this.fileKey, file, file.name);

        return this.http
            .post<RemoteFile>(`${this.apiUrl}/save/${id}`, formData, this.httpOptions);
    }

    getAll() {
        return this.http.get<RemoteFile[]>(`${this.apiUrl}`, this.httpOptions);
    }
}
