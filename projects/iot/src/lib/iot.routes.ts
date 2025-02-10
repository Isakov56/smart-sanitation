import { Route } from "@angular/router";
import { PermissionGuard } from 'core';
import { RoleGuard } from "core";

export const iotRouts: Route[] =[
  
    {
        path: 'sensori',
    loadComponent: () => import('../sensors/sensors.component').then(c => c.SensorsComponent)
    
    },
    {
        path: 'sensori/details',
    loadComponent: () => import('../sensors/sensor-details/sensor-details.component').then(c => c.SensorDetailsComponent)
    },
]