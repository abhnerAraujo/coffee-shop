import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./routes/home/home.component').then(m => m.HomeComponent),
  },
];
