// data.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadData, loadDataSuccess, loadDataFailure } from '../actions/data.actions';
import { DataState, initialDataState } from '../data.state';

export const dataReducer = createReducer(
  initialDataState,
  on(loadData, (state) => ({ ...state, loading: true, error: null })),
  on(loadDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    ids: data.map((item) => item.id),
    entities: data.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
  })),
  on(loadDataFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
