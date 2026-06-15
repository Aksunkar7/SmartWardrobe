import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'wardrobe',
    loadComponent: () => import('./features/wardrobe/wardrobe')
      .then(m => m.WardrobeComponent),
    canActivate: [authGuard]   
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];