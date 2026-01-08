import { createAction, props } from '@ngrx/store';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';

export const search = createAction(
  '[Search] Search',
  props<{ query: string }>()
);

export const searchSuccess = createAction(
  '[Search] Search Success',
  props<{ results: NominatimPlace[] }>()
);

export const searchFailure = createAction(
  '[Search] Search Failure',
  props<{ error: any }>()
);
