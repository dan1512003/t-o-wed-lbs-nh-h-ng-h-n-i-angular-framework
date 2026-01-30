import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { loadRestaurantById } from '../../store/restaurant/restaurant.actions';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { selectLoadingRestaurant, selectSelectedRestaurant } from '../../store/restaurant/restaurant.selectors';
import { addReview, editReview, loadAddress, loadReviewByEmailAndRestaurant, loadReviews } from '../../store/reviews/review.actions';
import { selectAddress, selectCommands, selectReviewLoading, selectReviews, selectReviewUser, selectStarCount } from '../../store/reviews/review.selectors';
import { UserModel } from '../../model/user/user.model';
import { selectUser } from '../../store/user/user.selectors';
import { FormsModule } from '@angular/forms';


const USER_COLOR_MAP = new Map<string, string>();

 function getRandomColor(): string {
  let r = 0, g = 0, b = 0;

  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  } while (
    (r > 240 && g > 240 && b > 240) ||
    (r > 200 && g < 80 && b < 80)
  );

  return `rgb(${r}, ${g}, ${b})`;
}

export function getUserColorStable(userName: string): string {
  if (!userName) return 'gray';

  if (!USER_COLOR_MAP.has(userName)) {
    USER_COLOR_MAP.set(userName, getRandomColor());
  }

  return USER_COLOR_MAP.get(userName)!;
}

export interface rating{
  overallrating :number,
  rateambience
: 
number,
ratefood
: 
number,
rateservice
: number
}
@Component({
  selector: 'app-restaurantdetail',
  imports: [CommonModule,FormsModule],
  templateUrl: './restaurantdetail.html',
  styleUrl: './restaurantdetail.scss',
})
export class Restaurantdetail {
  activeSection = signal<string>('');
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
  reviewComment :string = '';

  isScrolling =  input<boolean>(false);
  isScrollingChange = output<boolean>();
  showRateSheet :boolean = false;
  scrollPosition = 0;
  restaurant =signal<RestaurantModel | null>(null);
  loadingRestaurant = this.store.selectSignal(selectLoadingRestaurant);
  resultsRestaurant = this.store.selectSignal(selectSelectedRestaurant);
  resultsReviews = this.store.selectSignal(selectReviews);
  resultsCommands = this.store.selectSignal(selectCommands);
  resultsStarCount= this.store.selectSignal(selectStarCount);
  resultsAdress = this.store.selectSignal(selectAddress );
  resultsReviewUser= this.store.selectSignal(selectReviewUser); 
  loadingReviews= this.store.selectSignal(selectReviewLoading);

  user = signal<UserModel | null>(null);
  resultUser = this.store.selectSignal(selectUser);
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


firstTwoReviews = computed(() =>
  this.resultsCommands()?.slice(0, 2) ?? []
);
  ratings = [
  { label: 'Food', score: 4.7 },
  { label: 'Service', score: 4.7 },
  { label: 'Ambicent', score: 4.7 }
];
//hàm add review for user
 

 categoryRatings = signal([
    { name: 'Food', rate: 0 },
    { name: 'Service', rate: 0 },
    { name: 'Ambicent', rate: 0 },
    { name: 'Overallrating', rate: 0 },
  ]);

 
  firstThreeCategories = () => this.categoryRatings().slice(0, 3);

  isStarActiveUser(starIndex: number, rate: number): boolean {
    return starIndex < rate;
  }

  setStar(categoryIndex: number, starIndex: number) {
    this.categoryRatings.update(categories => {
      categories[categoryIndex].rate = starIndex + 1;
      return [...categories];
    });
  }



  
      
   
ngAfterViewInit() {
    
   if (typeof window !== 'undefined') {
    window.addEventListener('scroll', this.onScroll.bind(this));
    this.onScroll();
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

  onScroll() {
     if (this.isScrolling()) return;
    const sections = ['direction', 'menu', 'review', 'detail'];
    const scrollPos = window.pageYOffset + 125;

    for (let i = 0; i < sections.length ; i++) {
      const sectionEl = document.getElementById(sections[i]);
      const height = sectionEl?.offsetHeight;
      if(height==null)break;
      if (sectionEl && scrollPos <= sectionEl.offsetTop+height) {
        console.log('id click is:', sections[i]);
        this.activeSection.set(sections[i]);
        break;
      }
    }
  }
scrollTo(sectionId: string) {

     this.isScrollingChange.emit(true)
    this.activeSection.set(sectionId);
    const el = document.getElementById(sectionId);
     console.log('id click is:', sectionId);
    if (el) {
    const headerOffset = 120; 
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
  
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    })
    const checkScroll = () => {
    const currentPos = window.pageYOffset;
    if (Math.abs(currentPos - offsetPosition) < 2) { 
    this.isScrollingChange.emit(false)
      window.removeEventListener('scroll', checkScroll);
    }
  };

  window.addEventListener('scroll', checkScroll);
    }

  }
onTapDirection(){
  if (!this.restaurant()) return;

      this.router.navigate(['/direction'], {
      queryParams: {
        osmid: this.restaurant()?.osmId??""
      }
    });

}
   onTapReview(){
      this.router.navigate(['/review'], {
      queryParams: {
        osmid: this.restaurant()?.osmId??""
      }
    });

 }

 submitReview() {
  const restaurant = this.restaurant();
  const user = this.user();
   console.log("user",user)
    console.log("restaurant",restaurant)
  if (!restaurant || !user) return;

  const ratings = this.categoryRatings();

  const payload = {
    idRestaurant: restaurant.osmId,
    email: user.email,
    date: new Date().toISOString(),
    rateFood: ratings[0].rate,
    rateService: ratings[1].rate,
    rateAmbience: ratings[2].rate,
    overallRating: ratings[3].rate,
    command: this.reviewComment,
  };

  const reviewUser = this.resultsReviewUser();

  if (reviewUser) {
 console.log("editReview")
    this.store.dispatch(editReview({ payload }));
  } else {
  console.log("addReview")
    this.store.dispatch(addReview({ payload }));
  }

  this.closeRateSheet();
}

 openRateSheet() {
const user = this.user();
const restaurant = this.restaurant();

if (user && restaurant) {
  this.store.dispatch(
    loadReviewByEmailAndRestaurant({
      email: user.email,
      osmId: restaurant.osmId
    })
  );
}

 this.isScrollingChange.emit(true)
 this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

 
  document.body.style.position = 'fixed';
  document.body.style.top = `-${this.scrollPosition}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  this.showRateSheet = true;
  console.log('Add Review clicked');
}

closeRateSheet() {
  document.body.style.position = '';
document.body.style.top = '';
document.body.style.left = '';
document.body.style.right = '';
document.body.style.width = '';
 window.scrollTo(0, this.scrollPosition);
   this.isScrollingChange.emit(false)
  this.showRateSheet = false;

}
  constructor(private router:Router,
     private activateroute: ActivatedRoute, 
      private store:Store<AppState>){


   this.activateroute.queryParams.subscribe(params => {
    const keyword = params['osmid'] ?? '';
     console.log("osmid:",keyword)
    this.store.dispatch(loadRestaurantById({id:keyword}));

    
    });

effect(() => {
  const reviewUser = this.resultsReviewUser();
 console.log("Review User", reviewUser)
  if (reviewUser) {
    
    this.categoryRatings.set([
      { name: 'Food', rate: reviewUser.ratefood },
      { name: 'Service', rate: reviewUser.rateservice },
      { name: 'Ambicent', rate: reviewUser.rateambience },
      { name: 'Overallrating', rate: reviewUser.overallrating },
    ]);
  } else {

    this.categoryRatings.set([
      { name: 'Food', rate: 0 },
      { name: 'Service', rate: 0 },
      { name: 'Ambicent', rate: 0 },
      { name: 'Overallrating', rate: 0 },
    ]);
  }
});



      effect(() => {
    const resultUser = this.resultUser();
     console.log('RESULT USER:', resultUser);
 this.user.set(resultUser);
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
}
