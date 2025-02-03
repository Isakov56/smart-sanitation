import { Route } from "@angular/router";
import { SessionComponent } from "./session.component";

export const sessionRouts: Route[] =[
    {
        path: 'login',
        loadComponent: () => import('./session.component').then(c => c.SessionComponent)
    }
]