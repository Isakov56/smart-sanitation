import { Route } from "@angular/router";

export const settingsRouts: Route[] =[
    {
        path: 'infrastructure',
    loadComponent: () => import('./infrastructure/infrastructure.component').then(c => c.InfrastructureComponent)
    },
    {
        path: 'asset',
    loadComponent: () => import('./asset/asset.component').then(c => c.AssetComponent)
    },
    {
        path: 'sensors',
    loadComponent: () => import('./sensors/sensors.component').then(c => c.SensorsComponent)
    },
    {
        path: 'infrastructure/details',
    loadComponent: () => import('./infrastructure/details/details.component').then(c => c.DetailsComponent)
    },
    {
        path: 'asset/details',
    loadComponent: () => import('./asset/asset-details/asset-details.component').then(c => c.AssetDetailsComponent)
    },
    {
        path: 'sensors/details',
    loadComponent: () => import('./sensors/sensor-details/sensor-details.component').then(c => c.SensorDetailsComponent)
    },
]