
import { createFeatureSelector, createSelector } from '@ngrx/store';

import {SearchMapState} from "../route/route.reducer"
export const selectSearchMap =
  createFeatureSelector<SearchMapState >('searchMap');

export const selectResults = createSelector(
  selectSearchMap,
  (s) => s.results
);

export const selectRoute = createSelector(
  selectSearchMap,
  (s) => s.routeResult
);

export const selectRestaurant = createSelector(
  selectSearchMap,
  (s) => s.resultRestaurant
);

export const selectLoading = createSelector(
  selectSearchMap,
  (s) => s.loading
);
