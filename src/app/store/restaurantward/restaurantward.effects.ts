import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, from, map, mergeMap, of, switchMap, toArray } from 'rxjs';
import { Ward } from '../../services/ward/ward';
import { loadCuisine, loadCuisineFailure, loadCuisineSuccess, loadRestaurantAvail, loadRestaurantAvailFailure, loadRestaurantAvailSuccess, loadRestaurantByWard, loadRestaurantByWardFailure, loadRestaurantByWardSuccess, loadRestaurantCuisine, loadRestaurantCuisineFailure, loadRestaurantCuisineSuccess, loadRestaurantHighRate, loadRestaurantHighRateFailure, loadRestaurantHighRateSuccess, loadRestaurantNew, loadRestaurantNewFailure, loadRestaurantNewSuccess } from './restaurantward.actions';
import { WardModel } from '../../model/ward/ward.model';
import { Restaurant } from '../../services/restaurant/restaurant';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { addReviewToRestaurant } from '../restaurant/restaurant.effects';
import { Review } from '../../services/review/review';
import { Diet } from '../../services/diet/diet';
import { DietModel } from '../../model/diet/diet.model';
import { ReviewModel } from '../../model/review/review.model';

@Injectable()
export class RestaurantWardEffects {
  constructor(
    private actions$: Actions,
    private wardservice: Ward,
    private restaurantservice:Restaurant,
    private reviewservice:Review,
    private dietservice:Diet
  ) {}

  //Effect restaurant of ward
  loadRestaurantByWard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRestaurantByWard),
      switchMap(() =>
        this.wardservice.getWard().pipe(
          switchMap((dataWard: any) => {
              const featuresward:any[] = dataWard['features'];
            
                      const wards = featuresward.map(f =>
                          WardModel.fromMap(f['properties'])
                        );
            

            return from(wards).pipe(
              mergeMap((ward) =>
                this.restaurantservice
                  .getRestaurantByIdWard(Number(ward.osmId))
                  .pipe(
                    filter((data: any) => (data?.features?.length ?? 0) > 0),
                    map((data: any) => ({
                      ward,
                      count: data?.features?.length ?? 0,
                    })),
                   
                  ) 
              ),
             
              toArray(),
              map((data) =>
                loadRestaurantByWardSuccess({data })
              )
            );
          }),
           catchError((error:Error) =>
            of(loadRestaurantByWardFailure({ error:error.message }))
          )
        )
      )
    )
  );

  //Effect restaurant avail
  restaurantAvail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRestaurantAvail),
      switchMap(({ osmId }) => {
        const now = new Date();
        const dayMap: any = {
          Mon: 'Mo',
          Tue: 'Tu',
          Wed: 'We',
          Thu: 'Th',
          Fri: 'Fr',
          Sat: 'Sa',
          Sun: 'Su',
        };
        const dayAbbr =
          dayMap[new Intl.DateTimeFormat('en', { weekday: 'short' }).format(now)];

        return this.restaurantservice.getRestaurantByIdWard(+osmId).pipe(
          switchMap((data: any) => {
             const featuresRestaurant: any[] = data['features'];
                         
              const restaurants= featuresRestaurant.map(f => RestaurantModel.fromFeature(f));

            let avail = restaurants.filter((r) => {
              if (r.openingHour === '24/7') return true;
              return checkSchedule(r.openingHour, dayAbbr, now);
            });

            return addReviewToRestaurant(avail, this.reviewservice)
          }),
             map(restaurantMap =>
                        loadRestaurantAvailSuccess({
                               data:Array.from(restaurantMap.values())
                              })
                            ),
           catchError((error:Error) =>
            of(loadRestaurantAvailFailure({ error:error.message }))
          )
        );
      })
    )
  );

  // Restaurant effect
  restaurantCuisine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCuisine),
      switchMap(({ osmId }) =>
        this.dietservice.getDiet().pipe(
          switchMap((dietData) => {
            const dietMap = new Map<string, DietModel>();
            dietData.forEach((d) => {
              const diet = DietModel.fromJson(d);
              dietMap.set(diet.diet.toLowerCase(), diet);
            });

            return this.restaurantservice.getRestaurantByIdWard(+osmId).pipe(
              map((res: any) => {
                const restaurants: RestaurantModel[] = res.features.map(
                  (f: any) => RestaurantModel.fromFeature(f)
                );

                restaurants.forEach((r) => {
                  r.cuisine
                    ?.split(';')
                    .map((c) => c.trim().toLowerCase())
                    .forEach((c) => {
                      if (dietMap.has(c)) {
                        dietMap.get(c)!.count += 1;
                      }
                    });
                });

                const cuisine = Array.from(dietMap.values()).filter(
                  (d) => d.count > 0
                );

                return loadCuisineSuccess({ data: cuisine });
              })
            );
          }),
           catchError((error:Error) =>
            of(loadCuisineFailure({ error:error.message }))
          )
        )
      )
    )
  );

  //highrate effect
  restaurantHighRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRestaurantHighRate),
      switchMap(({ osmId }) =>
        this.reviewservice.getReview().pipe(
          switchMap((reviewData) => {
            const reviews: ReviewModel[] = reviewData.map((r) =>
              ReviewModel.fromJson(r)
            );

            return this.restaurantservice.getRestaurantByIdWard(+osmId).pipe(
              switchMap((res: any) => {
                const restaurants: RestaurantModel[] = res.features.map(
                  (f: any) => RestaurantModel.fromFeature(f)
                );

                const restaurantMap = new Map<string, RestaurantModel>();
                restaurants.forEach((r) => restaurantMap.set(r.osmId, r));

                reviews.forEach((r) => {
                  if (restaurantMap.has(r.idRestaurant)) {
                    const res = restaurantMap.get(r.idRestaurant)!;
                    res.overallRating += r.overallrating ?? 0;
                    res.reviewCount += 1;
                  }
                });

                let highRate = Array.from(restaurantMap.values())
                  .filter((r) => {
                    if (r.reviewCount === 0) return false;
                    r.overallRating = r.overallRating / r.reviewCount;
                    return r.overallRating > 2;
                  })
                  .sort((a, b) => b.overallRating - a.overallRating)
                  .slice(0, 10);

                highRate.forEach((r) => {
                  r.overallRating = 0;
                  r.reviewCount = 0;
                });
           return addReviewToRestaurant(highRate, this.reviewservice)
          }),
             map(restaurantMap =>
                        loadRestaurantHighRateSuccess({
                               data:Array.from(restaurantMap.values())
                              })
                            ),
            );
          }),
           catchError((error:Error) =>
            of(loadRestaurantHighRateFailure({ error:error.message }))
          )
        )
      )
    )
  );

  //new restaurant
  restaurantNew$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRestaurantNew),
      switchMap(({ osmId }) =>
        this.restaurantservice.getRestaurantByIdWard(+osmId).pipe(
          switchMap((res: any) => {
            const restaurants: RestaurantModel[] = res.features
              .map((f: any) => RestaurantModel.fromFeature(f))
              .filter(
                (r: RestaurantModel) =>
                  r.starttime && isDateInCurrentMonth(r.starttime)
              );

            return addReviewToRestaurant(restaurants, this.reviewservice)
          }),
             map(restaurantMap =>
                        loadRestaurantNewSuccess({
                               data:Array.from(restaurantMap.values())
                              })
                            ),
          catchError((error:Error) =>
            of(loadRestaurantNewFailure({ error:error.message }))
          )
        )
      )
    )
  );
loadRestaurantCuisine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRestaurantCuisine),
      switchMap(({ osmId, cuisine }) =>
        this.restaurantservice.getRestaurantByIdWard(+osmId).pipe(
          switchMap(data => {

            const restaurants: RestaurantModel[]= data.features.map((f: any) => RestaurantModel.fromFeature(f))
              .filter((r: RestaurantModel) => {
                if (!r.cuisine) return false;
                return r.cuisine
                  .split(';')
                  .map(s => s.trim())
                  .includes(cuisine);
              })
             return addReviewToRestaurant(restaurants, this.reviewservice)
          }),
         
            map(restaurantMap =>
                        loadRestaurantCuisineSuccess({
                               data:Array.from(restaurantMap.values())
                              })
                            ),
           catchError((error:Error) =>
            of(loadRestaurantCuisineFailure({ error:error.message }))
          )
        )
      )
    )
  );
}
export function checkSchedule(
  schedule: string,
  currentDay: string,
  now: Date
): boolean {
  const dayOrder: Record<string, number> = {
    Mo: 1,
    Tu: 2,
    We: 3,
    Th: 4,
    Fr: 5,
    Sa: 6,
    Su: 7,
  };

  // Tách từng phần cách nhau bởi ";"
  const parts = schedule.split(';');

  for (let part of parts) {
    part = part.trim();
    if (!part) continue;

    // Tách ngày và khung giờ
    const dayReg = /^([A-Za-z]{2})(?:-([A-Za-z]{2}))?/;
    const dayMatch = part.match(dayReg);
    if (!dayMatch) continue;

    const startDay = dayMatch[1];
    const endDay = dayMatch[2];

    // Lấy các ngày trong phần này
    const days: string[] = [];

    if (endDay) {
      const startIndex = dayOrder[startDay];
      const endIndex = dayOrder[endDay];

      for (let i = startIndex; i <= endIndex; i++) {
        const day = Object.keys(dayOrder).find(
          (k) => dayOrder[k] === i
        );
        if (day) days.push(day);
      }
    } else {
      days.push(startDay);
    }

    if (!days.includes(currentDay)) continue;

    // Lấy các khoảng giờ
    const timePart = part.substring(dayMatch[0].length).trim();
    const ranges = timePart.split(',');

    for (let range of ranges) {
      range = range.trim();
      const hm = range.split('-');
      if (hm.length !== 2) continue;

      const startMinutes = toMinutes(hm[0]);
      const endMinutes = toMinutes(hm[1]);
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
        return true;
      }
    }
  }

  return false;
}


function toMinutes(hm: string): number {
  const parts = hm.split(':');
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  return h * 60 + m;
}


export function isDateInCurrentMonth(dateStr: string): boolean {

  const parts = dateStr.split('/');
  if (parts.length !== 3) return false;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; 
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}
