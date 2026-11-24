import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'Home · testWebApp', loadComponent: () => import('./pages/home').then((m) => m.HomePage) },
  { path: 'about', title: 'About · testWebApp', loadComponent: () => import('./pages/about').then((m) => m.AboutPage) },
  { path: '**', redirectTo: '' },
];
