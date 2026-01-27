// review.state.ts
import { createReducer, on } from '@ngrx/store';
import { ReviewModel } from '../../model/review/review.model';
import { UserModel } from '../../model/user/user.model';
import { clearReviewState, loadAddressSuccess, loadReviewByUserSuccess, loadReviews, loadReviewsFailure, loadReviewsSuccess } from './review.actions';

export interface ReviewWithUser {
  review: ReviewModel;
  user: UserModel;
}

export interface ReviewState {
  reviews: ReviewWithUser[];
  commands: ReviewWithUser[];
  starCount: Record<number, number>;
  address: string;
  reviewUser: ReviewModel | null;
  loading: boolean;
  error: string | null;
}

export const initialReviewState: ReviewState = {
  reviews: [],
  commands: [],
  starCount: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
  address: '',
  reviewUser: null,
  loading: false,
  error: null,
};

export const reviewReducer = createReducer(
  initialReviewState,

  on(loadReviews, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadReviewsSuccess, (state, { reviews, commands, starCount }) => ({
    ...state,
    loading: false,
    reviews,
    commands,
    starCount,
  })),

  on(loadReviewByUserSuccess, (state, { review }) => ({
    ...state,
    reviewUser: review,
  })),

  on(loadAddressSuccess, (state, { address }) => ({
    ...state,
    address,
  })),

  on(loadReviewsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(clearReviewState, () => initialReviewState)
);
