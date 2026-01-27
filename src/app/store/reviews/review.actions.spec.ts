
import { UserModel } from '../../model/user/user.model';
import { ReviewModel } from '../../model/review/review.model';
import { loadReviews, loadReviewsFailure, loadReviewsSuccess } from './review.actions';

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


describe('Review Actions', () => {

  it('should create search action with query', () => {
    const query = '12372330757';
    const action = loadReviews({ osmId:query });

    expect(action.type).toBe('[Review] Load Reviews');
    expect(action.osmId).toBe(query);
  });

  it('should create loadReviewsSuccess action with results mapped from mockSearchResponse', () => {
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

    expect(action.type).toBe('[Review] Load Reviews Success');
    expect(action.commands.length).toBe(1);
    expect(action.reviews.length).toBe(2);
    expect(action.commands[0].review.email).toBe('test@example.com');
   expect(action.commands[0].review.email).toBe('test@example.com');
  });

  it('should create loadReviewsFailure action with error', () => {
    const error = { message: 'Something went wrong' };
    const action = loadReviewsFailure({ error:error.message });

    expect(action.type).toBe('[Review] Load Reviews Failure');
    expect(action.error).toEqual(error.message);
  });

});
