import {Injectable} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            const cloned = req.clone({
                headers: req.headers.set('X-Authorization', `Bearer ${accessToken}`)
            });

            return next.handle(cloned);
        }

        return next.handle(req);
    }
}
