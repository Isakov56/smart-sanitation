import { createReducer, on } from '@ngrx/store';
import { loadSensorsSuccess } from '../actions/sensor.actions';
import { Sensor } from '../models/sensor.model';

export interface SensorState {
  sensors: Sensor[];
}

const initialState: SensorState = {
  sensors: [],
};

export const sensorReducer = createReducer(
  initialState,
  on(loadSensorsSuccess, (state, { sensors }) => ({ ...state, sensors }))
);
