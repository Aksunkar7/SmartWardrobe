import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login')
      .then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register')
      .then(m => m.RegisterComponent)
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
];