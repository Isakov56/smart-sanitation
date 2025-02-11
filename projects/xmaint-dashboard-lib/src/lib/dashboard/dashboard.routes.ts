import { Route } from "@angular/router";
import { AuthGuard } from "xmaint-core-lib";

export const dashboardRouts: Route[] =[
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard.component').then(c => c.DashboardComponent)
        // , canActivate: [AuthGuard]
    }
]