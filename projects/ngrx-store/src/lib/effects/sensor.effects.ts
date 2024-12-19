import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SensorServiceNG } from 'core'; // Your SensorService
import { loadSensors, loadSensorsSuccess, loadSensorsFailure } from '../actions/sensor.actions'; // Adjust path
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SensorEffects {
  constructor(private actions$: Actions, private sensorService: SensorServiceNG) {}

  loadSensors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSensors),
      mergeMap(() =>
        this.sensorService.getSensors().pipe(
          map((sensors) => loadSensorsSuccess({ sensors })),
          catchError((error) => of(loadSensorsFailure({ error })))
        )
      )
    )
  );
}


