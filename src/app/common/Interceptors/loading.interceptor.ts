import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LoadingService } from '../../modules/services/loading/loading-signal.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.updateLoading(true)
  return next(req).pipe(
    tap(() => loadingService.updateLoading(true)),
    // zastosowane opóźnienie tylko prezentacyjne
    delay(3000),
    tap(() => loadingService.updateLoading(false)),
    finalize(() => loadingService.updateLoading(false)),
    catchError((error: HttpErrorResponse) => {
      loadingService.updateLoading(false);
      return throwError(() => new Error('An issue occurred. Please try again later.'));
    })
  );
};
