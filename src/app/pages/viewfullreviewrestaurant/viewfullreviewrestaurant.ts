import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { getUserColorStable, rating } from '../restaurantdetail/restaurantdetail';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loadRestaurantById } from '../../store/restaurant/restaurant.actions';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { selectLoadingRestaurant, selectSelectedRestaurant } from '../../store/restaurant/restaurant.selectors';
import { selectAddress, selectCommands, selectReviews, selectStarCount } from '../../store/reviews/review.selectors';
import { loadAddress, loadReviews } from '../../store/reviews/review.actions';
interface CalendarDay {
  date: Date;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelected: boolean  | null;
}
@Component({
  selector: 'app-viewfullreviewrestaurant',
  imports: [CommonModule],
  templateUrl: './viewfullreviewrestaurant.html',
  styleUrl: './viewfullreviewrestaurant.scss',
})
export class viewfullreviewrestaurant {

   constructor(private router:Router,
       private activateroute: ActivatedRoute, 
        private store:Store<AppState>){
  
  
     this.activateroute.queryParams.subscribe(params => {
      const keyword = params['osmid'] ?? '';
       console.log("osmid:",keyword)
      this.store.dispatch(loadRestaurantById({id:keyword}));
  
      
      });
  
 
  
  
  
  
     effect(() => {
  
  
  
  
  const results = this.resultsRestaurant();
  console.log('RESULT Restaurant:', results);
  
  if (!results) return;
  
  this.restaurant.set(results);
  this.store.dispatch(loadReviews ({osmId:results.osmId}));
  
  this.store.dispatch(loadAddress ({lat:results.lat, lon:results.lon}));
  const overallRating =
    !results.reviewCount || results.reviewCount === 0
      ? 0
      : Number((results.overallRating / results.reviewCount).toFixed(1));
  
      const ratefood =
    !results.reviewCount || results.reviewCount === 0
      ? 0
      : Number((results.ratefood / results.reviewCount).toFixed(1));
  
       const rateservice =
    !results.reviewCount || results.reviewCount === 0
      ? 0
      : Number((results.rateservice / results.reviewCount).toFixed(1));
  
       const rateambience =
    !results.reviewCount || results.reviewCount === 0
      ? 0
      : Number((results.rateambience / results.reviewCount).toFixed(1));
  this.ratingresult.set({
   overallrating :overallRating,
    rateambience
  : 
  rateambience,
  ratefood
  : 
  ratefood,
  rateservice
  : rateservice
  
  
  });
    this.ratings = [
    { label: 'Food', score: this.ratingresult().ratefood },
    { label: 'Service', score: this.ratingresult().rateservice },
    { label: 'Ambicent', score: this.ratingresult().rateambience }
  ];
  
  
    
  });
  
  
   effect(() => {
  
  
  
  
  const resultsReviews = this.resultsReviews();
  console.log('RESULT Reviews:', resultsReviews);
  const resultsCommands = this.resultsCommands();
  console.log('RESULT Command:', resultsCommands);
  const resultsStarCount = this.resultsStarCount();
  console.log('RESULT StarCount:', resultsStarCount);
  const resultsAdress = this.resultsAdress();
console.log('RESULT Adress:', resultsAdress);
  
  
    
  });
  
    };
 ratingresult =signal<rating>({
 overallrating :0,
  rateambience
: 
0,
ratefood
: 
0,
rateservice
: 0

  }); 
  totalStars :number = 5;
restaurant =signal<RestaurantModel | null>(null);
 ratings = [
  { label: 'Food', score: 4.7 },
  { label: 'Service', score: 4.7 },
  { label: 'Ambicent', score: 4.7 }
];
  sortType = signal<'recent' | 'high' | 'low'>('recent');
  loadingRestaurant = this.store.selectSignal(selectLoadingRestaurant);
  resultsRestaurant = this.store.selectSignal(selectSelectedRestaurant);
  resultsReviews = this.store.selectSignal(selectReviews);
  resultsCommands = this.store.selectSignal(selectCommands);
  resultsStarCount= this.store.selectSignal(selectStarCount);
 resultsAdress = this.store.selectSignal(selectAddress );
   ratingBars = computed(() => {
    const starCount = this.resultsStarCount();
    if (!starCount) return [];
  
    return [5, 4, 3, 2, 1].map(star => {
      const factor = this.getWidthFactorOfStar(star, starCount);
      return {
        score: star,
        width: `${Math.round(factor * 100)}%`
      };
    });
  });
   sortedCommands = computed(() => {
    const commands = this.resultsCommands();
    const sort = this.sortType();

    if (!commands || commands.length === 0) return [];

    const cloned = [...commands]; // 👈 clone để không mutate store

    switch (sort) {
      case 'recent':
        return cloned.sort((a, b) => b.review.id - a.review.id);

      case 'high':
        return cloned.sort(
          (a, b) =>
            (b.review.overallrating ?? 0) -
            (a.review.overallrating ?? 0)
        );

      case 'low':
        return cloned.sort(
          (a, b) =>
            (a.review.overallrating ?? 0) -
            (b.review.overallrating ?? 0)
        );

      default:
        return cloned;
    }
  });
  onSortChange(event: Event) {
    this.sortType.set(
      (event.target as HTMLSelectElement).value as
        | 'recent'
        | 'high'
        | 'low'
    );
  }
  getWidthFactorOfStar(
    star: number,
    starCount: Record<number, number>
  ): number {
   
    if (star === 5) {
      return 1;
    }
  
    const fiveStarCount = starCount[5] ?? 0;
    const totalReviews = Object.values(starCount).reduce((sum, v) => sum + v, 0);
  
    if (fiveStarCount > 0) {
      return (starCount[star] ?? 0) / fiveStarCount;
    } else if (totalReviews > 0) {
      return (starCount[star] ?? 0) / totalReviews;
    } else {
      return 0;
    }
  }
    //hàm tô sao theo đánh giá của khách hàng
  isStarActive(index: number, rating: number): boolean {
    return index < rating;
  }
    //hàm tô sao theo overallrating
  getStarFill(index: number): number {
    const fullStars = Math.floor(this.ratingresult().overallrating);
    const fraction = this.ratingresult().overallrating- fullStars;
  
    if (index < fullStars) return 100;        
    if (index === fullStars) return fraction * 100; 
    return 0;                                  
  }
  getUserColor(userName: string): string {
    return getUserColorStable(userName);
  }
  
  
  
    getFirstLetter(name: string): string {
    if (!name) return '';
    return name.trim().charAt(0).toUpperCase();
  }
  
}
