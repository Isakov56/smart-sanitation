import { Routes } from '@angular/router';
import { sessionRouts } from 'session';
import { dashboardRouts } from 'dashboard';
import { maintenanceRouts } from 'maintenance';
import { monitoringdRouts } from 'monitoring';
import { reportsdRouts } from 'reports';
import { RouteConfig } from 'isakov-shared';
import { addDeviceRouts } from 'add-device';
import { addUserRouts } from 'add-user'
import { settingsRouts } from 'settings'


export const routes: Routes = [
    ...sessionRouts,
    ...dashboardRouts,
    ...maintenanceRouts,
    ...monitoringdRouts,
    ...reportsdRouts,
    ...addDeviceRouts,
    ...addUserRouts,
    ...settingsRouts,
    { path: '**', redirectTo: 'report' }
];

export const routeConfig: RouteConfig[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'home' },
    { path: '/monitoring', label: 'Monitoraggio', icon: 'tv' },
    { path: '/maintenance', label: 'Manutenzione', icon: 'build' },
    { path: '/reports', label: 'Reports', icon: 'feed' },
    { path: '/add-user', label: 'Crea utente', icon: 'person_add_alt_icon' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ];