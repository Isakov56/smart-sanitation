import { Routes } from '@angular/router';
import { sessionRouts } from 'session';
// import { dashboardRouts } from 'dashboard';
// import { maintenanceRouts } from 'maintenance';
// import { monitoringdRouts } from 'monitoring';
// import { reportsdRouts } from 'reports';
// import { addUserRouts } from 'add-user';
// import { settingsRouts } from 'settings';
// import { testRouts } from 'tes-page'
import { addDeviceRouts } from 'add-device';
import { SessionComponent } from 'session'; // Ensure you have the LoginComponent
import { AuthGuard } from 'core'; // AuthGuard to protect routes
import { SanitationLayoutComponent } from 'sanitation-layout'; // Your layout component
import { RouteConfig } from 'isakov-shared';
import { UnauthorizedComponent } from 'shared';
import { testRouts } from 'routes';
import { maintenanceRouts } from 'routes';
import { reportsdRouts } from 'routes';
import { monitoringdRouts } from 'routes';
import { addUserRouts } from 'routes'
import { settingsRouts } from 'routes';
import { dashboardRouts } from 'routes'

export const routeConfig: RouteConfig[] = [
    { path: '/dashboard', label: 'Dashboard', icon: 'home' },
    { path: '/monitoring', label: 'Monitoraggio', icon: 'tv' },
    { path: '/maintenance', label: 'Manutenzione', icon: 'build' },
    { path: '/reports', label: 'Reports', icon: 'feed' },
    { path: '/add-user', label: 'Crea utente', icon: 'person_add_alt_icon' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
    { path: '/test-page', label: 'Test', icon: 'light' },
  ]

export const routes: Routes = [
  {
    path: 'login', // Public route without layout
    component: SessionComponent,
  },
  {
    path: '', // Authenticated route group with layout
    component: SanitationLayoutComponent, // Layout that includes sidebar, header, etc.
    // canActivate: [AuthGuard], // Protect all routes inside this layout
    children: [
      ...dashboardRouts,
      ...maintenanceRouts,
      ...monitoringdRouts,
      ...reportsdRouts,
      ...addDeviceRouts,
      ...addUserRouts,
      ...settingsRouts,
      ...testRouts
    ],
    data: {
        routeConfig: routeConfig,  // Pass the routeConfig data to SanitationLayoutComponent
      },
  }, 
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '**', // Fallback route
    redirectTo: 'login', // Redirect to login if no matching route is found
  },
];

;
