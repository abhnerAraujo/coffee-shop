import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./routes/home/home.component').then(m => m.HomeComponent),
  },
];
