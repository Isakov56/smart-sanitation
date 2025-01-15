// data.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DataState } from '../data.state';

export const selectDataState = createFeatureSelector<DataState>('data');

export const selectAllDataItems = createSelector(
  selectDataState,
  (state) => Object.values(state.entities)
);

export const selectDataLoading = createSelector(
  selectDataState,
  (state) => state.loading
);

export const selectDataError = createSelector(
  selectDataState,
  (state) => state.error
);
