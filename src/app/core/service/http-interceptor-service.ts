import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';
@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  count: number = 0;
  timeoutSeconds: number = 300;
  resetOnTrigger: boolean = false;
  timeoutExpired: Subject<number> = new Subject<number>();
  loggedInUser: any;
  takeRequest: number = 0;

  constructor(private router: Router, private cookie: CookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.takeRequest++;
    this.count = -1;
    const url =
      this.cookie.get('login') &&
      request.url.indexOf('olamoauth/api/v1/oauth/token') > -1
        ? false
        : true;
    if (this.cookie.get('login')) {
      let requestHeaders = {
        setHeaders: {},
      };

      this.loggedInUser = JSON.parse(this.cookie.get('login'));
      // modify request
      requestHeaders.setHeaders = {
        Authorization: `Bearer ${this.loggedInUser.access_token}`,
      };
      request = request.clone(requestHeaders);
    }

    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
          }
        },
        (response) => {
          if (
            response.error &&
            response.error.error &&
            response.error.error === 'invalid_token'
          ) {
            this.cookie.deleteAll('/');
            this.router.navigate(['/']);
          }
        }
      ),
      finalize(() => {})
    );
  }
}
