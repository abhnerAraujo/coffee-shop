import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () =>
      import('./routes/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'brew',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./routes/brews/brews.component').then(m => m.BrewsComponent),
      },
      {
        path: ':brewingId',
        loadComponent: () =>
          import('./routes/brew-details/brew-details.component').then(
            m => m.BrewDetailsComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
