import { createAction, props } from '@ngrx/store';
import { Sensor } from '../models/sensor.model'; // Adjust import according to your model

// Action to load sensors
export const loadSensors = createAction('[Sensor] Load Sensors');

// Action for successful loading of sensors
export const loadSensorsSuccess = createAction(
  '[Sensor] Load Sensors Success',
  props<{ sensors: Sensor[] }>()
);

// Action for failed loading of sensors
export const loadSensorsFailure = createAction(
  '[Sensor] Load Sensors Failure',
  props<{ error: any }>()
);
