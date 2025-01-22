import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from '../data.state';
import { LayoutState } from '../reducers/data.reducer';

// Feature key for the DataState (adjust this to match your store setup)
export const selectDataState = createFeatureSelector<DataState>('data');

// *** Devices Selectors ***

// Select loading status for devices
export const selectDevicesLoading = createSelector(
  selectDataState,
  (state: DataState) => state.loadingDevices
);

// Select error for devices
export const selectDevicesError = createSelector(
  selectDataState,
  (state: DataState) => state.deviceError
);

// Select all device IDs
export const selectDeviceIds = createSelector(
  selectDataState,
  (state: DataState) => state.deviceIds
);

// Select all devices as an array
export const selectAllDevices = createSelector(
  selectDataState,
  (state: DataState) => Object.values(state.deviceEntities)
);

// Select a specific device by ID
export const selectDeviceById = (deviceId: string) =>
  createSelector(selectDataState, (state: DataState) => state.deviceEntities[deviceId]);

// *** Sensors Selectors ***

// Select loading status for sensors
export const selectSensorsLoading = createSelector(
  selectDataState,
  (state: DataState) => state.loadingSensors
);

// Select error for sensors
export const selectSensorsError = createSelector(
  selectDataState,
  (state: DataState) => state.sensorError
);

// Select all sensor IDs
export const selectSensorIds = createSelector(
  selectDataState,
  (state: DataState) => state.sensorIds
);

// Select all sensors as an array
export const selectAllSensors = createSelector(
  selectDataState,
  (state: DataState) => Object.values(state.sensorEntities)
);

// Select a specific sensor by ID
export const selectSensorById = (sensorId: string) =>
  createSelector(selectDataState, (state: DataState) => state.sensorEntities[sensorId]);


export const selectLayoutState = createFeatureSelector<LayoutState>('layout');;
