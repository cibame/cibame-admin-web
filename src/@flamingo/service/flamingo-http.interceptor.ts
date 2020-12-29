import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {FlamingoAuthService} from './flamingo-auth.service';

@Injectable()
export class FlamingoHttpInterceptor implements HttpInterceptor {

  constructor(private inj: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.inj.get(FlamingoAuthService);
    const newReq = req.clone(
      {
        headers: !!authService.authorizationToken ?
          req.headers
            .set('Authorization', authService.authorizationToken)
            .set('Content-Type', 'application/json')
          :
          req.headers,
        // url: environment.baseUrl + req.url
      }
    );
    return next.handle(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            authService.logout();
          }
          return throwError(error);
        }
      ));
  }
}
