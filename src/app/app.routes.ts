import { Routes } from '@angular/router';
import { sessionRouts } from 'session';


export const routes: Routes = [
    ...sessionRouts,
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
