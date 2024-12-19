import { createAction, props } from '@ngrx/store';
import { Device } from '../models/device.model';

export const loadDevices = createAction('[Device] Load Devices');
export const loadDevicesSuccess = createAction(
  '[Device] Load Devices Success',
  props<{ devices: Device[] }>()
);
export const loadDevicesFailure = createAction(
  '[Device] Load Devices Failure',
  props<{ error: any }>()
);
