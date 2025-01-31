import { Route } from "@angular/router";

export const testRouts: Route[] =[
    {
        path: 'test-page',
        loadComponent: () => import('./tes-page.component').then(c => c.TesPageComponent)
    }
]