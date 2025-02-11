// data.module.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dataReducer } from './state/reducers/data.reducer';
import { DataEffects } from './state/effects/data.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('data', dataReducer),
    EffectsModule.forFeature([DataEffects]),
  ],
})
export class DataModule {}
