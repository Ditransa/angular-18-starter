import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const RefreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/Auth/login') && !req.url.includes('/Auth/refresh-token')) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(
            switchMap(tokens => {
              isRefreshing = false;
              authService.saveTokens(tokens.accessToken, tokens.refreshToken);
              refreshTokenSubject.next(tokens.accessToken);
              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${tokens.accessToken}`,
                },
              });
              return next(clonedRequest);
            }),
            catchError(err => {
              isRefreshing = false;
              authService.logout(); // redirigir al login
              return throwError(() => err);
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token => {
              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return next(clonedRequest);
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};
