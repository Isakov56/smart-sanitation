import { Routes } from '@angular/router';
import { sessionRouts } from 'session';
import { dashboardRouts } from 'dashboard'
import { RouteConfig } from 'isakov-shared'


export const routes: Routes = [
    ...sessionRouts,
    ...dashboardRouts,
    { path: '', redirectTo: '', pathMatch: 'full' }
];

export const routeConfig: RouteConfig[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'home' },
    { path: '/table', label: 'Monitoraggio', icon: 'tv_icon' },
    { path: '/table', label: 'Manutenzione', icon: 'build_icon' },
    { path: '/table', label: 'Reports', icon: 'feed_icon' },
    { path: '/table', label: 'Crea utente', icon: 'person_add_alt_icon' }
  ];