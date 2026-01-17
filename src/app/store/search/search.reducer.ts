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

  on(search, (state) => {

    // console.log('   prev state:', state);

    const newState = {
      ...state,
      loading: true,
      error: null
    };

    console.log('   next state:', newState);
    return newState;
  }),

 
  on(searchSuccess, (state, { results }) => {

    // console.log('   prev state:', state);

    const newState = {
      ...state,
      results,
      loading: false
    };

    console.log('   next state:', newState);
    return newState;
  }),


  on(searchFailure, (state, { error }) => {

    // console.log('   prev state:', state);

    const newState = {
      ...state,
      results: [],
      loading: false,
      error
    };

    console.log('   next state:', newState);
    return newState;
  })
);
