import { Route } from "@angular/router";

export const sessionRouts: Route[] =[
    {
        path: 'login',
        loadComponent: () => import('./session/session.component').then(c => c.SessionComponent)
    }
]