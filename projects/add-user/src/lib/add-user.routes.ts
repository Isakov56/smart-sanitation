import { Route } from "@angular/router";

export const addUserRouts: Route[] =[
    {
        path: 'add-user',
        loadComponent: () => import('./add-user.component').then(c => c.AddUserComponent)
    }
]