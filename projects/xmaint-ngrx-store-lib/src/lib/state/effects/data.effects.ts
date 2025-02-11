import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { loadDevices, loadDevicesSuccess, loadDevicesFailure, loadSensors, loadSensorsSuccess,  loadSensorsFailure} from '../actions/data.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class DataEffects {
  loadDevices$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(loadDevices), // Listen for the `loadDevices` action
      tap(() => console.log('Devices load action received')), // Optional logging
      mergeMap(() =>
        this.dataService.getDevices().pipe( // Fetch devices from the service
          map((devices) => loadDevicesSuccess({ devices })), // Dispatch success action
          catchError((error) => {
            console.error('Error loading devices:', error); // Log error
            return of(loadDevicesFailure({ error: error.message })); // Dispatch failure action
          })
        )
      )
    )
  );

  // Effect for sensors
  loadSensors$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(loadSensors),
      tap(() => console.log('Sensors load action received')),
      mergeMap(() =>
        this.dataService.getSensors().pipe(
          map(sensors => loadSensorsSuccess({ sensors })),
          catchError(error => {
            console.error('Error loading sensors:', error);
            return of(loadSensorsFailure({ error: error.message }));
          })
        )
      )
    )
  );

  constructor( private http: HttpClient, private dataService: DataService) {}
}


