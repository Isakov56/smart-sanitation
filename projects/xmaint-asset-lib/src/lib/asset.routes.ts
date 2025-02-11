import { Route } from "@angular/router";
import { PermissionGuard } from 'xmaint-core-lib';
import { RoleGuard } from "xmaint-core-lib";

export const assetsRouts: Route[] =[
    {
        path: 'asset',
    loadComponent: () => import('./asset/asset.component').then(c => c.AssetComponent)
    },
    {
        path: 'asset/details',
    loadComponent: () => import('./asset/asset-details/asset-details.component').then(c => c.AssetDetailsComponent)
    }
]