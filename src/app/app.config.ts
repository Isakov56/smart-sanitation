import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ApiInterceptor } from 'core';
import { MatIconModule } from '@angular/material/icon';

import { provideNgrxStoreLib  } from 'ngrx-store'

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from 'ngrx-store'; // Path to your reducers
import { SensorEffects } from 'ngrx-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),  // Importing HttpClientModule
    // importProvidersFrom(HttpClientJsonpModule),  // Importing HttpClientJsonpModule
    importProvidersFrom(MatIconModule),
    // { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    // ...provideNgrxStoreLib,
    importProvidersFrom(
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([SensorEffects])
    ),
  ],
};
