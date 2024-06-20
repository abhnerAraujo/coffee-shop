import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () =>
      import('./routes/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'brew',
    loadComponent: () =>
      import('./routes/brew/brew.component').then(m => m.BrewComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
