import { Route } from "@angular/router";
import { PermissionGuard } from 'core';

export const maintenanceRouts: Route[] =[
    {
        path: 'maintenance',
        loadComponent: () => import('./maintenance.component').then(c => c.MaintenanceComponent)
        , canActivate: [PermissionGuard],
    data: {
      permission: 'INFR_02' // Example required permission
    } 
    }
]