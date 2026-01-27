// review.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReviewState } from './review.reducer';

export const selectReviewState =
  createFeatureSelector<ReviewState>('review');

export const selectReviews = createSelector(
  selectReviewState,
  state => state.reviews
);

export const selectCommands = createSelector(
  selectReviewState,
  state => state.commands
);

export const selectStarCount = createSelector(
  selectReviewState,
  state => state.starCount
);

export const selectAddress = createSelector(
  selectReviewState,
  state => state.address
);

export const selectReviewUser = createSelector(
  selectReviewState,
  state => state.reviewUser
);

export const selectReviewLoading = createSelector(
  selectReviewState,
  state => state.loading
);

export const selectReviewError = createSelector(
  selectReviewState,
  state => state.error
);
