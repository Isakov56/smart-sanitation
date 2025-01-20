import { Route } from "@angular/router";
import { AuthGuard } from "core";

export const dashboardRouts: Route[] =[
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard.component').then(c => c.DashboardComponent)
        , canActivate: [AuthGuard]
    }
]