import { ActionReducerMap } from '@ngrx/store';
import { deviceReducer, DeviceState } from './device.reducers';
import { sensorReducer, SensorState } from './sensor.reducers';

export interface AppState {
  devices: DeviceState;
  sensors: SensorState;
}

export const reducers: ActionReducerMap<AppState> = {
  devices: deviceReducer,
  sensors: sensorReducer,
};
