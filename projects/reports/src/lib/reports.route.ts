import { Route } from "@angular/router";

export const reportsdRouts: Route[] =[
    {
        path: 'reports',
        loadComponent: () => import('./reports.component').then(c => c.ReportsComponent)
    }
]