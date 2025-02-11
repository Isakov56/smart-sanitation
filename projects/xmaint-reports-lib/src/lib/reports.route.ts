import { Route } from "@angular/router";

export const reportsdRouts: Route[] =[
    {
        path: 'reports',
        loadComponent: () => import('./reports/reports.component').then(c => c.ReportsComponent),
        
    },
    {
        path: 'reports/report', // Define 'reports/report' as its own route
        loadComponent: () =>
          import('./reports/report/report.component').then(c => c.ReportComponent),
      }
]