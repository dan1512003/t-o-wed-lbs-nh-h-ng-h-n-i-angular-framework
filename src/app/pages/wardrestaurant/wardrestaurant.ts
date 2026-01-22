import { CommonModule } from '@angular/common';
import { Component, effect, input, output, ViewChild ,ElementRef, signal} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TownScroll } from '../../components/town-scroll/town-scroll';
import { HightScroll } from '../../components/hight-scroll/hight-scroll';
import { NewScroll } from '../../components/new-scroll/new-scroll';
import { CuisineScroll } from '../../components/cuisine-scroll/cuisine-scroll';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { loadCuisine, loadRestaurantAvail, loadRestaurantHighRate, loadRestaurantNew } from '../../store/restaurantward/restaurantward.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectCuisineData, selectCuisineLoading, selectRestaurantAvailData, selectRestaurantAvailLoading, selectRestaurantHighRateData, selectRestaurantHighRateLoading, selectRestaurantNewData, selectRestaurantNewLoading } from '../../store/restaurantward/restaurantward.selectors';
import { DietModel } from '../../model/diet/diet.model';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { selectResults } from '../../store/search/search.selectors';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { search } from '../../store/search/search.actions';

@Component({
  selector: 'app-wardrestaurant',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,TownScroll,HightScroll,NewScroll,CuisineScroll],
  templateUrl: './wardrestaurant.html',
  styleUrl: './wardrestaurant.scss',
})
export class Wardrestaurant {
  keyword = input<string>('');   
  hasSearched = input<boolean>(); 
  isSearch =signal<boolean>(false);  
  keywordChange = output<string>();
  wardsavail= signal<RestaurantModel[]>([]);
  wardsnew= signal<RestaurantModel[]>([]);
  wardshightrate= signal<RestaurantModel[]>([]);
  wardcuisine =signal<DietModel[]>([]);
  items = signal<NominatimPlace[]>([]);
  results = this.store.selectSignal(selectResults);
  osmId =signal<string>('');
  searchControl = new FormControl('');
        resultswardavail= this.store.selectSignal(selectRestaurantAvailData );
        loadingRestaurantAvail = this.store.selectSignal(selectRestaurantAvailLoading);
        resultswardhightrate= this.store.selectSignal(selectRestaurantHighRateData );
        loadingRestaurantHightrate = this.store.selectSignal(selectRestaurantHighRateLoading);
        resultswardnew= this.store.selectSignal(selectRestaurantNewData);
        loadingRestaurantNew = this.store.selectSignal(selectRestaurantNewLoading);
         resultswardcuisine= this.store.selectSignal(selectCuisineData);
        loadingCuisine = this.store.selectSignal(selectCuisineLoading);
//   cuisines=[

//  { diet: 'American', image: '' },{ diet: 'Chinese', image: '' },{ diet: 'Russian', image: '' },
//   { diet: 'Italian', image: '' },
//   { diet: 'Mexican', image: '' },
//   { diet: 'French', image: '' },
//   { diet: 'Japanese', image: '' },
//   { diet: 'Indian', image: '' },
//   { diet: 'Thai', image: '' },
//   { diet: 'Korean', image: '' },
//   { diet: 'Mediterranean', image: '' },
//   { diet: 'Vietnam', image: '' },
  

// ]

//    wards = [
//     {
//       ward: { name: 'Hoàn Kiếm', image: '', osmId: 1 },
//       count: 34
//     },
//     {
//       ward: { name: 'Ba Đình', image: '', osmId: 2 },
//       count: 21
//     },
    
//   ];
constructor(private router: Router, 
  private activateroute: ActivatedRoute,
   private store:Store<AppState>) {
   this.activateroute.queryParams.subscribe(params => {
      const keyword = params['osmId'] ?? '';
      this.osmId.set(keyword);
         console.log("keyword findssss",keyword)
        
      this.store.dispatch(loadRestaurantAvail({osmId:keyword}));
      this.store.dispatch(loadRestaurantHighRate({osmId:keyword}));
      this.store.dispatch(loadRestaurantNew({osmId:keyword}));
      this.store.dispatch(loadCuisine({osmId:keyword}));
      });
 effect(() => {



  const resultswardavail = this.resultswardavail();
  console.log(' RESULTS AVAIL UPDATED:', resultswardavail);
  this.wardsavail.set(resultswardavail);


  const resultswardhightrate = this.resultswardhightrate();
  console.log(' RESULTS Hightrate UPDATED:', resultswardhightrate);
  this.wardshightrate.set(resultswardhightrate);

   const resultswardnew = this.resultswardnew();
  console.log(' RESULTS New UPDATED:', resultswardnew);
  this.wardsnew.set(resultswardnew);

   const resultswardcuisine= this.resultswardcuisine();
  console.log(' RESULTS New UPDATED:',resultswardcuisine);
  this.wardcuisine.set(resultswardcuisine);
});
   
      effect(() => {
if(!this.isSearch())return;
      if(this.hasSearched()===false){
       
  const results = this.results();
 
    this.items.set(results);
const value = this.searchControl.value ?? '';
 this.keywordChange.emit(value);
      }else{
    
this.searchControl.setValue(this.keyword(), {
  emitEvent: false
});
      }  

    
  
    });
  }

   ngOnInit() {
      this.searchControl.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(value => {
            console.log('INPUT VALUE:', value);
          if (value?.trim()) {
            this.isSearch.set(true);
             console.log('DISPATCH search:', value);
            this.store.dispatch(search({ query: value }));
          } else {
             console.log('DISPATCH search: empty');
            this.store.dispatch(search({ query: '' }));
          }
         
        });
    }
  onSubmit() {
    const value = this.searchControl.value ?? '';
     console.log("value home",value)
    this.router.navigate(['/find'], {
      queryParams: {
        keyword: value
      }
    });
  }



 findByPick(item: NominatimPlace) {
  console.log('Picked item:', item);

  
  this.items.set([]);


  this.searchControl.setValue(item.name, {
    emitEvent: false 
  });



}
  

 
}
