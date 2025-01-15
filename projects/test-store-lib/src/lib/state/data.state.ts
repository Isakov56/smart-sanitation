// data.state.ts
import { EntityState } from '@ngrx/entity';
import { DataItem } from './models/data.model';

export interface DataState extends EntityState<DataItem> {
  loading: boolean;
  error: string | null;
}

export const initialDataState: DataState = {
  ids: [],
  entities: {},
  loading: false,
  error: null,
};
