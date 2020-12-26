import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { SpinnerOverlayService } from 'src/app/services/spinner-overlay.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly spinnerOverlayService: SpinnerOverlayService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spinnerSubscription: Subscription = this.spinnerOverlayService.spinner$.subscribe();
    return next.handle(req).pipe(finalize(() => spinnerSubscription.unsubscribe()));
  }
}

export const spinnerInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
];
