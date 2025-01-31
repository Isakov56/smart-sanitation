import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducers } from './reducers';
// import { DeviceEffects } from './effects/device.effects';
import { SensorEffects } from './effects/sensor.effects';

export const provideNgrxStoreLib = [
  provideStore(reducers),
  provideEffects([ SensorEffects]),
];