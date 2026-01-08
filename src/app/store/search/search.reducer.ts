import { createReducer, on } from '@ngrx/store';
import { search, searchSuccess, searchFailure } from './search.actions';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';

export interface SearchState {
  results: NominatimPlace[];
  loading: boolean;
  error: any;
}

export const initialState: SearchState = {
  results: [],
  loading: false,
  error: null
};

export const searchReducer = createReducer(
  initialState,
  on(search, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(searchSuccess, (state, { results }) => ({
    ...state,
    results,
    loading: false
  })),
  on(searchFailure, (state, { error }) => ({
    ...state,
    results: [],
    loading: false,
    error
  }))
);
