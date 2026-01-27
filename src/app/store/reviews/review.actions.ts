import { createAction, props } from '@ngrx/store';
import { ReviewModel } from '../../model/review/review.model';
import { ReviewWithUser } from './review.reducer';



export const loadReviews = createAction(
  '[Review] Load Reviews',
  props<{ osmId: string }>()
);

export const loadReviewsSuccess = createAction(
  '[Review] Load Reviews Success',
  props<{
    reviews: ReviewWithUser[];
    commands: ReviewWithUser[];
    starCount: Record<number, number>;
  }>()
);

export const loadReviewsFailure = createAction(
  '[Review] Load Reviews Failure',
  props<{ error: string }>()
);



export const loadReviewByUserSuccess = createAction(
  '[Review] Load Review By User Success',
  props<{ review: ReviewModel | null }>()
);

export const loadReviewByEmailAndRestaurant = createAction(
  '[Review] Load Review By Email And Restaurant',
  props<{ email: string; osmId: string }>()
);



export const addReview = createAction(
  '[Review] Add Review',
  props<{
    payload: {
      idRestaurant: string;
      email: string;
      date: string;
      rateFood: number;
      rateService: number;
      rateAmbience: number;
      overallRating: number;
      command: string;
    };
  }>()
);

export const editReview = createAction(
  '[Review] Edit Review',
  props<{
    payload: {
      idRestaurant: string;
      email: string;
      date: string;
      rateFood: number;
      rateService: number;
      rateAmbience: number;
      overallRating: number;
      command: string;
    };
  }>()
);


export const loadAddress = createAction(
  '[Review] Load Address',
  props<{ lat: number; lon: number }>()
);

export const loadAddressSuccess = createAction(
  '[Review] Load Address Success',
  props<{ address: string }>()
);



export const clearReviewState = createAction(
  '[Review] Clear State'
);
