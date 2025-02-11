import { Route } from "@angular/router";
import { PermissionGuard } from 'xmaint-core-lib';
import { RoleGuard } from "xmaint-core-lib";

export const infrastructureRouts: Route[] =[
    {
        path: 'infrastruttura',
    loadComponent: () => import('./infrastructure/infrastructure.component').then(c => c.InfrastructureComponent)
    , canActivate: [PermissionGuard],
    data: {
      permission: 'INFR_02' // Example required permission
    } 
    },
    {
        path: 'infrastruttura/details',
    loadComponent: () => import('./infrastructure/details/details.component').then(c => c.DetailsComponent)
    , canActivate: [RoleGuard],
    data: {
        role: 'COD_01', // Specify the roles allowed to access this route
      }
    }
]