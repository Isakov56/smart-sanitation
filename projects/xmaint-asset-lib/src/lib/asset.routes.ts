import { Route } from "@angular/router";
import { PermissionGuard } from 'core';
import { RoleGuard } from "core";

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