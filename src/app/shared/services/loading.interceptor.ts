import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './../../core/services/LoadingForInterceptor/loading.service';
import { inject } from '@angular/core';

// Usamos HttpInterceptorFn correctamente para Angular 18
export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn // Usa HttpHandlerFn para la función
): Observable<HttpEvent<any>> => {
  const loadingService = inject(LoadingService); // Usar inyección de dependencias

  loadingService.show(); // Activar loading

  return next(req).pipe(
    // Aquí ya usamos next directamente como función
    finalize(() => loadingService.hide()) // Ocultar loading al finalizar
  );
};
