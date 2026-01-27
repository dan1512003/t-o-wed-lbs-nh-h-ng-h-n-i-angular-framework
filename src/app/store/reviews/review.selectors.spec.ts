import { ReviewModel } from "../../model/review/review.model";
import { ReviewWithUser } from "./review.reducer";
import { selectCommands, selectReviews, selectStarCount } from "./review.selectors";




describe('Review Selectors', () => {

 interface ReviewState {
   reviews: ReviewWithUser[];
   commands: ReviewWithUser[];
   starCount: Record<number, number>;
   address: string;
   reviewUser: ReviewModel | null;
   loading: boolean;
   error: string | null;
 }
 
 const initialReviewState: ReviewState = {
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

  // restaurantward selectors
  it('should selectReviews', () => {
    expect(selectReviews.projector(initialReviewState)).toEqual([]);
  });
 it('should selectCommands', () => {
    expect(selectCommands.projector(initialReviewState)).toEqual([]);
  });

 it('should selectStarCount', () => {
    expect(selectStarCount.projector(initialReviewState)).toEqual({
     1: 0,
     2: 0,
     3: 0,
     4: 0,
     5: 0,
   });
  });

 

});
