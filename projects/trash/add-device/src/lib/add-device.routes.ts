import { Route } from "@angular/router";

export const addDeviceRouts: Route[] =[
    {
        path: 'aggiungi-dispositivo',
        loadComponent: () => import('./add-device.component').then(c => c.AddDeviceComponent)
    }
]