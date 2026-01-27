// review.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as ReviewActions from './review.actions';


import { ReviewModel } from '../../model/review/review.model';
import { UserModel } from '../../model/user/user.model';
import { Place } from '../../services/place/place';
import { User } from '../../services/user/user';
import { Review } from '../../services/review/review';
import { addReview, editReview, loadAddress, loadReviewByEmailAndRestaurant, loadReviews } from './review.actions';

@Injectable()
export class ReviewEffects {
  constructor(
    private actions$: Actions,
    private reviewService: Review,
    private userService: User,
    private placeService: Place
  ) {}


  loadAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAddress),
      switchMap(({ lat, lon }) =>
        this.placeService.getAddressFromLatLon(lat, lon).pipe(
          map(address =>
            ReviewActions.loadAddressSuccess({ address })
          ),
          catchError(err =>
            of(
              ReviewActions.loadReviewsFailure({
                error: err.message || 'Get address failed',
              })
            )
          )
        )
      )
    )
  );


loadReviews$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadReviews),
    switchMap(({ osmId }) =>
      this.reviewService.getReviewById(+osmId).pipe(
        switchMap((data: any[]) => {
          const reviews = data.map(d => ReviewModel.fromJson(d));

          // reset starCount mỗi lần load
          const starCount: Record<number, number> = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          };

          reviews.forEach(r => {
            if (r.overallrating && starCount[r.overallrating] !== undefined) {
              starCount[r.overallrating]++;
            }
          });

          const commandReviews = reviews.filter(
            r => r.command && r.command.trim() !== ''
          );

        
          const reviewsWithUser$ =
            reviews.length === 0
              ? of([])
              : forkJoin(
                  reviews.map(r =>
                    this.userService.getUser(r.email).pipe(
                      map(user => ({
                        review: r,
                        user: UserModel.fromJson(user[0]),
                      }))
                    )
                  )
                );

          const commandsWithUser$ =
            commandReviews.length === 0
              ? of([])
              : forkJoin(
                  commandReviews.map(r =>
                    this.userService.getUser(r.email).pipe(
                      map(user => ({
                        review: r,
                        user: UserModel.fromJson(user[0]),
                      }))
                    )
                  )
                );

          return forkJoin({
            reviews: reviewsWithUser$,
            commands: commandsWithUser$,
            starCount: of(starCount),
          });
        }),
        map(({ reviews, commands, starCount }) =>
          ReviewActions.loadReviewsSuccess({
            reviews,
            commands,
            starCount,
          })
        ),
        catchError(err =>
          of(
            ReviewActions.loadReviewsFailure({
              error: err.message || 'Load review failed',
            })
          )
        )
      )
    )
  )
);


//   loadReviewsByEmail$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(ReviewActions.loadReviewsByEmail),
//       switchMap(({ email }) =>
//         this.reviewService.getReviewByEmail(email).pipe(
//           map(data =>
//             data.map(d => ReviewModel.fromJson(d))
//           ),
//           map(reviews =>
//             ReviewActions.loadReviewByUserSuccess({
//               review: reviews.length ? reviews[0] : null,
//             })
//           ),
//           catchError(err =>
//             of(
//               ReviewActions.loadReviewsFailure({
//                 error: err.message,
//               })
//             )
//           )
//         )
//       )
//     )
//   );


  loadReviewByEmailAndRestaurant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReviewByEmailAndRestaurant),
      switchMap(({ email, osmId }) =>
        this.reviewService.getReviewByEmailAndOsmId(email, +osmId).pipe(
          map(data =>
            data.map(d => ReviewModel.fromJson(d))
          ),
          map(reviews =>
            ReviewActions.loadReviewByUserSuccess({
              review: reviews.length ? reviews[0] : null,
            })
          ),
          catchError(err =>
            of(
              ReviewActions.loadReviewsFailure({
                error: err.message,
              })
            )
          )
        )
      )
    )
  );

  addReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addReview),
      switchMap(({ payload }) =>
        this.reviewService.addReview(payload).pipe(
          map(() =>
            ReviewActions.loadReviews({ osmId: payload.idRestaurant })
          ),
          catchError(err =>
            of(
              ReviewActions.loadReviewsFailure({
                error: err.message,
              })
            )
          )
        )
      )
    )
  );


  editReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editReview),
      switchMap(({ payload }) =>
        this.reviewService.editReview(payload).pipe(
          map(() =>
            ReviewActions.loadReviews({ osmId: payload.idRestaurant })
          ),
          catchError(err =>
            of(
              ReviewActions.loadReviewsFailure({
                error: err.message,
              })
            )
          )
        )
      )
    )
  );
}
