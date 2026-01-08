import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from './search.reducer';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectResults = createSelector(
  selectSearchState,
  (state) => state.results
);

export const selectLoading = createSelector(
  selectSearchState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectSearchState,
  (state) => state.error
);
