import { createReducer, on } from '@ngrx/store';
import {
  loadDevices,
  loadDevicesSuccess,
  loadDevicesFailure,
  loadSensors,
  loadSensorsSuccess,
  loadSensorsFailure,
  saveLayout
} from '../actions/data.actions';
import { DataState, initialDataState } from '../data.state';
import { GridsterItem } from 'angular-gridster2';

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


export interface LayoutState {
  layout: GridsterItem[];
}

export const initialState: LayoutState = {
  layout: [] // Start with an empty layout
};

export const layoutReducer = createReducer(
  initialState,
  on(saveLayout, (state, { layout }) => ({
    ...state,
    layout: layout // Update layout in the state
  }))
);