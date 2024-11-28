import { Routes } from '@angular/router';
import { sessionRouts } from 'session';
import { dashboardRouts } from 'dashboard';
import { maintenanceRouts } from 'maintenance';
import { monitoringdRouts } from 'monitoring';
import { reportsdRouts } from 'reports';
import { RouteConfig } from 'isakov-shared';
import { addDeviceRouts } from 'add-device'


export const routes: Routes = [
    ...sessionRouts,
    ...dashboardRouts,
    ...maintenanceRouts,
    ...monitoringdRouts,
    ...reportsdRouts,
    ...addDeviceRouts,
    { path: '', redirectTo: '', pathMatch: 'full' }
];

export const routeConfig: RouteConfig[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'home' },
    { path: '/monitoring', label: 'Monitoraggio', icon: 'tv_icon' },
    { path: '/maintenance', label: 'Manutenzione', icon: 'build_icon' },
    { path: '/reports', label: 'Reports', icon: 'feed_icon' },
    { path: '/login', label: 'Crea utente', icon: 'person_add_alt_icon' }
  ];