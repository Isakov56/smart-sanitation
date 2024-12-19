import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers'; // Adjust the path if necessary
import { SensorState } from '../reducers/sensor.reducers'; // Adjust the path if necessary

// Select the sensor feature state
const selectSensorState = createFeatureSelector<AppState, SensorState>('sensors');

// Selector to get all sensors
export const selectAllSensors = createSelector(
  selectSensorState,
  (state: SensorState) => state.sensors
);

// Selector to get a sensor by deviceId
export const selectSensorsByDeviceId = (deviceId: string) =>
  createSelector(
    selectSensorState,
    (state: SensorState) => state.sensors.filter(sensor => sensor.deviceId === deviceId)
  );
