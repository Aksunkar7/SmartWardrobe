import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from '../services/token';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(Token);
  const router = inject(Router);

  if (tokenService.getAccess()) {
    return true;
  }
  
  router.navigate(['/login'])
  return false;
};
