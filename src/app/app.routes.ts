import { Routes } from '@angular/router';
import { UIRoutes } from './shared/constants';

export const routes: Routes = [
  {
    path: UIRoutes.ROOT,
    redirectTo: UIRoutes.HOME,
    pathMatch: 'full',
  },
  {
    path: UIRoutes.HOME,
    loadComponent: () => import('@layout/home/home').then((c) => c.Home),
  },
];
