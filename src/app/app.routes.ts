import { Routes } from '@angular/router';
// import { sessionRouts } from 'session';
import { sessionRouts } from 'xmaint-session-lib';
// import { dashboardRouts } from 'dashboard';
import { dashboardRouts } from 'xmaint-dashboard-lib';
// import { maintenanceRouts } from 'maintenance';
import { maintenanceRouts } from 'xmaint-maintenance-lib';
// import { monitoringdRouts } from 'monitoring';
import { monitoringdRouts } from 'xmaint-monitoring-lib';
// import { reportsdRouts } from 'reports';
import { reportsdRouts } from 'xmaint-reports-lib';
// import { addUserRouts } from 'identity';
import { addUserRouts } from 'xmaint-identity-lib';
// import { settingsRouts } from 'settings';
import { testRouts } from 'tes-page'
// import { SanitationLayoutComponent } from 'template-smart-sanitation';
import { SanitationLayoutComponent } from 'xmaint-template-sanitation-lib';
import { addDeviceRouts } from 'add-device';
// import { SessionComponent } from 'session';
import { SessionComponent } from 'xmaint-session-lib'; 
import { AuthGuard } from 'xmaint-core-lib'; 
import { RouteConfig } from 'isakov-shared';
import { UnauthorizedComponent } from 'xmaint-shared-lib';
// import { testRouts } from 'routes';
// import { maintenanceRouts } from 'routes';
// import { reportsdRouts } from 'routes';
// import { monitoringdRouts } from 'routes';
// import { addUserRouts } from 'routes'
// import { iotRouts } from 'iot';
import { iotRouts } from 'xmaint-iot-lib';
import { assetsRouts} from 'xmaint-asset-lib'
// import { assetsRouts } from 'asset';
// import { infrastructureRouts } from 'infrastructure';
import { infrastructureRouts } from 'xmaint-infrastructure-lib';
// import { settingsRouts } from 'routes';
// import { dashboardRouts } from 'routes'
// import { SessionComponent } from 'routes';
// import { SanitationLayoutComponent } from 'shared';

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
      // ...settingsRouts,
      ...iotRouts,
      ...assetsRouts,
      ...infrastructureRouts,
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
