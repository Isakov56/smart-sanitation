import { Route } from "@angular/router";

export const reportsdRouts: Route[] =[
    {
        path: 'reports',
        loadComponent: () => import('./reports.component').then(c => c.ReportsComponent),
        
    },
    {
        path: 'reports/report', // Define 'reports/report' as its own route
        loadComponent: () =>
          import('./report/report.component').then(c => c.ReportComponent),
      }
]