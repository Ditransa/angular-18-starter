import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { inject } from '@angular/core';

export const AuthenticatedGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated$()) {
    return router.navigate(['/home/dashboard']);
  } else {
    return true;
  }
};
