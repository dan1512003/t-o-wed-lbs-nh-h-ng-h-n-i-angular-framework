import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestScheduler } from 'rxjs/testing';
import { Place } from '../../services/place/place';
import { Action } from '@ngrx/store';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { ReviewEffects } from './review.effects';
import { User } from '../../services/user/user';
import { Review } from '../../services/review/review';
import { loadReviews, loadReviewsFailure, loadReviewsSuccess } from './review.actions';
import { ReviewModel } from '../../model/review/review.model';
import { UserModel } from '../../model/user/user.model';



describe('ReviewEffects', () => {

  let effects: ReviewEffects;
 let actions = new Observable<Action>();
  const placeSpy = jasmine.createSpyObj('Place', ['getAddressFromLatLon']);
  // const restaurantSpy = jasmine.createSpyObj('Restaurant', ['getRestaurant']);
  // const wardSpy = jasmine.createSpyObj('Ward', ['getWard']);
   const reviewSpy =jasmine.createSpyObj('Review',[
    'getReview',
    'getReviewById',
    'getReviewByEmailAndOsmId',
    'addReview',
    'editReview'
  
  ])
  const userSpy = jasmine.createSpyObj('User', ['getUser']);
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      ReviewEffects,
        provideMockActions(() => actions),
        { provide: Place, useValue: placeSpy },
        { provide: User, useValue: userSpy },
        { provide: Review, useValue: reviewSpy },
      ]
    });

    effects = TestBed.inject(ReviewEffects);


    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
describe('loadReviews$ ', () => {
  const mockresponsereview = [
    {
        "id": 2,
        "ratefood": 4,
        "rateservice": 4,
        "rateambience": 3,
        "overallrating": 3,
        "command": "good food",
        "id_restaurant": "12372330757",
        "email": "test@example.com",
        "date": "02/12/2025 15:30:45",
        "like": null
    },
    {
        "id": 12,
        "ratefood": 3,
        "rateservice": 3,
        "rateambience": 3,
        "overallrating": 3,
        "command": null,
        "id_restaurant": "12372330757",
        "email": "test12@example.com",
        "date": "24/12/2025 15:30:45",
        "like": null
    }
]
const mockresponseuser=[
    {
        "email": "test@example.com",
        "name": "Lu Bu",
        "phone": "0987654321",
        "image": null
    }
]


    it('should dispatch loadReviewsSuccess with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: loadReviews({osmId:"12372330757"}) });

    
        const userResponse = cold('--y|', { y: mockresponseuser });
        const reviewResponse = cold('--z|', { z: mockresponsereview });

      
        reviewSpy.getReviewById.and.returnValue(reviewResponse);
        userSpy.getUser.and.returnValue(userResponse);
         const reviews = mockresponsereview.map(d => ReviewModel.fromJson(d));
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
                  const userReview =[{
                             review: ReviewModel.fromJson( {
        "id": 2,
        "ratefood": 4,
        "rateservice": 4,
        "rateambience": 3,
        "overallrating": 3,
        "command": "good food",
        "id_restaurant": "12372330757",
        "email": "test@example.com",
        "date": "02/12/2025 15:30:45",
        "like": null
    }),
      user: UserModel.fromJson(   {
        "email": "test@example.com",
        "name": "Lu Bu",
        "phone": "0987654321",
        "image": null
    }),
                           },
                          
                      {
                             review: ReviewModel.fromJson(    {
       "id": 12,
        "ratefood": 3,
        "rateservice": 3,
        "rateambience": 3,
        "overallrating": 3,
        "command": null,
        "id_restaurant": "12372330757",
        "email": "test12@example.com",
        "date": "24/12/2025 15:30:45",
        "like": null
    }),
      user: UserModel.fromJson(   {
        "email": "test@example.com",
        "name": "Lu Bu",
        "phone": "0987654321",
        "image": null
    }),
                           }    
                          
                          
                          
                          ]
         const userCommand =[{
                             review: ReviewModel.fromJson(    {
        "id": 2,
        "ratefood": 4,
        "rateservice": 4,
        "rateambience": 3,
        "overallrating": 3,
        "command": "good food",
        "id_restaurant": "12372330757",
        "email": "test@example.com",
        "date": "02/12/2025 15:30:45",
        "like": null
    }),
      user: UserModel.fromJson(   {
        "email": "test@example.com",
        "name": "Lu Bu",
        "phone": "0987654321",
        "image": null
    }),
                           }]
        expectObservable(effects.loadReviews$).toBe('------b', {
          b: loadReviewsSuccess({ 
reviews:userReview,
commands:userCommand,
starCount:starCount

           })
        });
      });
    });


    it('should dispatch loadReviewsFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
      actions = hot('-a', { a: loadReviews({osmId:"12372330757"}) });

       
    
        const userResponse = cold('--y|', { y: mockresponseuser });
        const reviewResponse =cold('--#|', {}, new Error('API error'));

        reviewSpy.getReviewById.and.returnValue(reviewResponse);
        userSpy.getUser.and.returnValue(userResponse);

        expectObservable(effects.loadReviews$).toBe('---b', {
          b: loadReviewsFailure({ error: 'API error' })
        });
      });
    });

  });

});
