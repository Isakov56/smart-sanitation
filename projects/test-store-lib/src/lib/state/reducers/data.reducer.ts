import { createReducer, on } from '@ngrx/store';
import {
  loadDevices,
  loadDevicesSuccess,
  loadDevicesFailure,
  loadSensors,
  loadSensorsSuccess,
  loadSensorsFailure,
} from '../actions/data.actions';
import { DataState, initialDataState } from '../data.state';

export const dataReducer = createReducer(
  initialDataState,
  // Devices
  on(loadDevices, (state) => ({ ...state, loadingDevices: true, error: null })),
  on(loadDevicesSuccess, (state, { devices }) => ({
    ...state,
    loadingDevices: false,
    deviceIds: devices.map((device) => device.id),
    deviceEntities: devices.reduce((acc, device) => ({ ...acc, [device.id]: device }), {}),
  })),
  on(loadDevicesFailure, (state, { error }) => ({ ...state, loadingDevices: false, error })),
  
  // Sensors
  on(loadSensors, (state) => ({ 
    ...state, 
    loadingSensors: true, 
    sensorsError: null 
  })),
  on(loadSensorsSuccess, (state, { sensors }) => ({
    ...state,
    loadingSensors: false,
    sensorIds: sensors.map((sensor) => sensor.id),
    sensorEntities: sensors.reduce((acc, sensor) => ({ ...acc, [sensor.id]: sensor }), {}),
  })),
  on(loadSensorsFailure, (state, { error }) => ({ 
    ...state, 
    loadingSensors: false, 
    sensorsError: error 
  }))
);
