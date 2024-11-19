import { Route } from "@angular/router";

export const maintenanceRouts: Route[] =[
    {
        path: 'maintenance',
        loadComponent: () => import('./maintenance.component').then(c => c.MaintenanceComponent)
    }
]