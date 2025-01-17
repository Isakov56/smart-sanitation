// data.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadDevices, loadDevicesSuccess, loadDevicesFailure } from '../actions/data.actions';
import { DataState, initialDataState } from '../data.state';

export const dataReducer = createReducer(
  initialDataState,
  on(loadDevices, (state) => ({ ...state, loading: true, error: null })),
  on(loadDevicesSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    ids: data.map((item) => item.id),
    entities: data.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
  })),
  on(loadDevicesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
