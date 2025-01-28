import { Route } from "@angular/router";

export const monitoringdRouts: Route[] =[
    {
        path: 'monitoring',
        loadComponent: () => import('./monitoring.component').then(c => c.MonitoringComponent)
    }
]