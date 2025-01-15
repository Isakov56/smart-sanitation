import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ApiInterceptor } from 'core';
import { MatIconModule } from '@angular/material/icon';
import { DataModule } from 'test-store-lib';
import { StoreModule } from '@ngrx/store';  // Import StoreModule
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';

// import { provideNgrxStoreLib  } from 'ngrx-store'

// import { provideStore, StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { reducers } from 'ngrx-store'; // Path to your reducers
// import { SensorEffects } from 'ngrx-store';
// import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),  // Importing HttpClientModule
    // importProvidersFrom(HttpClientJsonpModule),  // Importing HttpClientJsonpModule
    importProvidersFrom(MatIconModule),
    importProvidersFrom(DataModule, StoreModule.forRoot({}), // Add StoreModule if you haven't
    EffectsModule.forRoot([])),
    importProvidersFrom(StoreModule.forRoot({})),
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    importProvidersFrom(StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }))
    // ...provideNgrxStoreLib,
    // importProvidersFrom(
    //   StoreModule.forRoot(reducers),
    //   EffectsModule.forRoot([SensorEffects])
    // ),
    // provideStore(reducers),
    // provideEffects([SensorEffects]),
  ],
};
