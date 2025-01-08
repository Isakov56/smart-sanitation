import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SensorServiceNG } from 'core'; // Your SensorService
import { loadSensors, loadSensorsSuccess, loadSensorsFailure } from '../actions/sensor.actions'; // Adjust path
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SensorEffects {
  constructor(private actions$: Actions, private sensorService: SensorServiceNG) {
    // console.log(actions$, 'what is this tell me'), console.log('Sensor Service:', sensorService);
  }

  loadSensors$: any 
  
}


