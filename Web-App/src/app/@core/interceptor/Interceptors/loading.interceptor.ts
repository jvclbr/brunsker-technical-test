import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpHeadersEnum } from '../../base';
import { InterceptorService } from '../Service';


@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  private request !: string;
  private isLoading !: boolean;

  constructor(
    private readonly interceptorService: InterceptorService
  ) {
    this.interceptorService.getLastRequest().subscribe(lastRequest => this.request = lastRequest);
    this.interceptorService.getLoading().subscribe(isLoading => this.isLoading = isLoading);
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const SkipLoadding = req.headers.has(HttpHeadersEnum.HIDE_LOADDING);

    if (!this.isLoading && !SkipLoadding) {
      this.interceptorService.setLoading(true);
    }

    this.interceptorService.setLastRequest(req.url);

    return next.handle(req).pipe(
      finalize(() => {
        if (req.url === this.request) {
          this.interceptorService.setLoading(false);
        }
      })
    );

  }
}
