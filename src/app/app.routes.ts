import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'random-quote', // Cambia para redirigir a random-quote
    pathMatch: 'full',
  },
  {
    path: 'random-quote',
    loadComponent: () =>
      import('./random-quote/random-quote.page').then((m) => m.RandomQuotePage),
  },
  {
    path: 'manage-quotes',
    loadComponent: () =>
      import('./manage-quotes/manage-quotes.page').then(
        (m) => m.ManageQuotesPage
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
  },
];
