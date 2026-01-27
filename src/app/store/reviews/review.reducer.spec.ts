
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { ReviewModel } from '../../model/review/review.model';
import { UserModel } from '../../model/user/user.model';
import { loadReviews, loadReviewsFailure, loadReviewsSuccess } from './review.actions';
import { initialReviewState, reviewReducer } from './review.reducer';

describe('SearchReducer', () => {
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


  it('should set loading true and error null on review action', () => {
    const action = loadReviews({ osmId: '123456789' });
    const state = reviewReducer(initialReviewState, action);
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
    expect(state.reviews).toEqual([]);

  });

  it('should set results and loading false on loadReviewsSuccess', () => {
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
   
       const action =loadReviewsSuccess({ reviews:userReview,
         commands:userCommand,
         starCount:starCount
       });
     const state = reviewReducer(initialReviewState, action);

    expect(state.reviews).toEqual(userReview);
    expect(state.commands).toEqual(userCommand);
    expect(state.starCount).toEqual(starCount);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should set error and reset results on loadReviewsFailure', () => {
    const action = loadReviewsFailure({ error: 'API Error' });
   const state = reviewReducer(initialReviewState, action);

    expect(state.error).toBe('API Error');
    expect(state.loading).toBeFalse();
  });

 
});
