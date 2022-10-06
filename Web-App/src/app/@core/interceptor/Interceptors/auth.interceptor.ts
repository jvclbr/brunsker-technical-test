import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../../../auth';
import { HttpHeadersEnum } from '../../base';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.getAuthToken()
    .pipe(
      take(1),
      switchMap(authToken => {
        const SkipAuthInterceptor = req.headers.has(HttpHeadersEnum.SKIP_AUTH_INTERCEPTOR);
        if (authToken && !SkipAuthInterceptor) {

          const DupReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`),
          });

          const ShouldRefresh = this.authService.checkIfAuthTokenShouldRefresh();
          if(ShouldRefresh){
            this.authService.refresh(false);
          }
          return next.handle(DupReq);
        }

        return next.handle(req);
      })
    )

  }
}
