import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastEnum, ToastService } from '../../toast';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly toastService: ToastService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const ErrMessage = err.error.data ? err.error.data.message: err.error.message;
        this.toastService.showToast({
          data: {
            content: ErrMessage
          },
          type: ToastEnum.DANGER
        })
        throw err;
      })
    );

  }
}
