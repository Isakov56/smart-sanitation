import { createAction, props } from '@ngrx/store';

export const loadDevices = createAction('[Devices] Load Devices');

export const loadDevicesSuccess = createAction(
  '[Devices] Load Devices Success',
  props<{ devices: any[] }>()
);

export const loadDevicesFailure = createAction(
  '[Devices] Load Devices Failure',
  props<{ error: string }>()
);

// Actions for sensors
export const loadSensors = createAction('[Sensors] Load Sensors');
export const loadSensorsSuccess = createAction('[Sensors] Load Sensors Success', props<{ sensors: any[] }>());
export const loadSensorsFailure = createAction('[Sensors] Load Sensors Failure', props<{ error: string }>());
