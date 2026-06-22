import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { noAuthGuard } from './core/guards/no-auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login')
      .then(m => m.Login),
    canActivate: [noAuthGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register')
      .then(m => m.RegisterComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: 'wardrobe',
    loadComponent: () => import('./features/wardrobe/wardrobe')
      .then(m => m.Wardrobe),
    canActivate: [authGuard]   
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'wardrobe/add',
    loadComponent: () => import('./features/wardrobe/add-item/add-item')
      .then(m => m.AddItem),
    canActivate: [authGuard]
  },

  {
    path: 'wardrobe/edit/:id',
    loadComponent: () => import('./features/wardrobe/edit-item/edit-item')
      .then(m => m.EditItem),
    canActivate: [authGuard]
  },
  {
    path: 'outfits',
    loadComponent: () => import('./features/outfits/outfits')
      .then(m => m.Outfits),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile')
      .then(m => m.Profile),
    canActivate: [authGuard]
  },
];