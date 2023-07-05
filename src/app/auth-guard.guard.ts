import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isAuthenticated()) {
    // return inject(Router).navigate(['/admin']);
    return true;
  } else {
    // inject(Router).createUrlTree(['/', 'login']);
    return inject(Router).navigate(['/login']);
    // this.route.navigate(['/login']);
  }
};
