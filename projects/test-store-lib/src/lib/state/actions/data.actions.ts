import { createAction, props } from '@ngrx/store';

export const loadDevices = createAction('[Data] Load Data');

export const loadDevicesSuccess = createAction(
  '[Data] Load Data Success',
  props<{ data: any[] }>()
);

export const loadDevicesFailure = createAction(
  '[Data] Load Data Failure',
  props<{ error: string }>()
);

// Actions for sensors
export const loadSensors = createAction('[Sensors] Load Sensors');
export const loadSensorsSuccess = createAction('[Sensors] Load Sensors Success', props<{ data: any[] }>());
export const loadSensorsFailure = createAction('[Sensors] Load Sensors Failure', props<{ error: string }>());
