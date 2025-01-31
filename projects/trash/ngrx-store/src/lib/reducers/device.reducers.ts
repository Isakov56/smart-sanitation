import { createReducer, on } from '@ngrx/store';
import { loadDevicesSuccess } from '../actions/device.actions';
import { Device } from '../models/device.model';

export interface DeviceState {
  devices: Device[];
}

const initialState: DeviceState = {
  devices: [],
};

export const deviceReducer = createReducer(
  initialState,
  on(loadDevicesSuccess, (state, { devices }) => ({ ...state, devices }))
);
