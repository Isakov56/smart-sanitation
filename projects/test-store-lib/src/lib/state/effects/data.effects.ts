import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { loadDevices, loadDevicesSuccess, loadDevicesFailure, loadSensors, loadSensorsSuccess,  loadSensorsFailure} from '../actions/data.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class DataEffects {
  loadDevices$ = createEffect(() =>{

      return inject(Actions).pipe(
          ofType(loadDevices),
          tap(action => console.log('Action received in effect:', action)), // Log the incoming action
          mergeMap(() => 
            this.dataService.getDevices().pipe( // Use the service to fetch data
                map(data => loadDevicesSuccess({ data })), // Dispatch `loadDevicesSuccess` with the data
                catchError(error => {
                  console.error('Error loading data', error); // Log the error
                  return of(loadDevicesFailure({ error: error.message })); // Dispatch `loadDataFailure` with the error
                })
          )
          ),
          tap(() => console.log('loadData action handled successfully'))
      );
  }
  );

  // Effect for sensors
  loadSensors$ = createEffect(() =>
    inject(Actions).pipe(
      ofType(loadSensors),
      tap(() => console.log('Sensors load action received')),
      mergeMap(() =>
        this.dataService.getSensors().pipe(
          map(data => loadSensorsSuccess({ data })),
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


