import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { loadData, loadDataSuccess, loadDataFailure } from '../actions/data.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class DataEffects {
  loadData$ = createEffect(() =>{

      return inject(Actions).pipe(
          ofType(loadData),
          tap(action => console.log('Action received in effect:', action)), // Log the incoming action
          mergeMap(() => this.http.get<any[]>('http://localhost:4200/assets/cards.json').pipe(
              map(data => loadDataSuccess({ data })),
              catchError(error => {
                  console.error('Error loading data', error);
                  return of(loadDataFailure({ error: error.message }));
              })
          )
          ),
          tap(() => console.log('loadData action handled successfully'))
      );
  }
  );

  constructor( private http: HttpClient) {}
}


