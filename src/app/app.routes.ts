import { Routes } from '@angular/router';
import { RootLayout } from './layout/root-layout/root-layout';
import { UIRoutes } from './shared/constants';

export const routes: Routes = [
  {
    path: UIRoutes.ROOT,
    component: RootLayout,
    children: [
      { path: UIRoutes.ROOT, redirectTo: UIRoutes.HOME, pathMatch: 'full' },
      {
        path: UIRoutes.HOME,
        loadComponent: () => import('@layout/home/home').then((c) => c.Home),
      },
      {
        path: UIRoutes.RIDE_SUMMARY,
        loadComponent: () =>
          import('@features/book-ride/ride-summary/ride-summary').then((c) => c.RideSummary),
        title: 'Ride Summary',
      },
    ],
  },
];
