import { Route } from "@angular/router";

export const dashboardRouts: Route[] =[
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard.component').then(c => c.DashboardComponent)
    }
]