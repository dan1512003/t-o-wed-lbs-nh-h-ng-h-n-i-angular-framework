import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, effect, Inject, input, output, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectRestaurantAvailData, selectRestaurantAvailLoading, selectRestaurantCuisineData, selectRestaurantCuisineLoading, selectRestaurantHighRateData, selectRestaurantHighRateLoading, selectRestaurantNewData, selectRestaurantNewLoading } from '../../store/restaurantward/restaurantward.selectors';
import { loadRestaurantAvail, loadRestaurantCuisine, loadRestaurantHighRate, loadRestaurantNew } from '../../store/restaurantward/restaurantward.actions';

@Component({
  selector: 'app-view-all',
  imports: [CommonModule],
  templateUrl: './view-all.html',
  styleUrl: './view-all.scss',
})
export class ViewAll {
  totalStars :number = 5;
   overallrating  = signal<number>(0);
  stickyChange = output<boolean>();
  keyword = input<string>('');    
  keywordChange = output<string>();
  isFullMap= signal<boolean>(false);
  title= signal<string>('');
  restaurants = signal<RestaurantModel[]>([]);
  resultswardavail= this.store.selectSignal(selectRestaurantAvailData );
  loadingRestaurantAvail = this.store.selectSignal(selectRestaurantAvailLoading);
  resultswardcuisine= this.store.selectSignal(selectRestaurantCuisineData);
  loadingRestaurantCuisine = this.store.selectSignal(selectRestaurantCuisineLoading);
  resultswardnew= this.store.selectSignal(selectRestaurantNewData);
  loadingRestaurantNew = this.store.selectSignal(selectRestaurantNewLoading);
  isSetView=signal<boolean>(false);
  isClickMarker= signal<boolean>(false);
    restaurant: any = {
    name: 'Pizza House',
    image: 'https://via.placeholder.com/400x200', 
    openingHour: '09:00 AM - 10:00 PM',
    overallRating: 18, 
    reviewCount: 5 
  };
   private map: any;
private markerLayer: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    
    private router:Router,
    private activateroute: ActivatedRoute,
    private store:Store<AppState>
  ) {
 

      effect(() => {

        let results:RestaurantModel[]=[];
switch (this.title()) {
  case 'restaurantcuisine':
     results = this.resultswardcuisine();

    break;

  case 'restaurantnew':
      results = this.resultswardnew();

    break;

  case 'restaurantavail':
      results = this.resultswardavail();
;
    break;

  default:
    break;
}



 if (!results || results.length === 0) return;

  this.restaurants.set(results);
   console.log(' RESULTS UPDATED:', this.restaurants());
this.renderMarkers(this.restaurants());
 const first = results[0];
  this.map.setView([first.lat, first.lon], 17, { animate: true });

});
   

  
     
  }

  ngOnDestroy() {
    this.stickyChange.emit(false);
  }

  ngOnInit() {
   
  }
    closeMarker(event: Event) {
   
    this.isClickMarker.set(false);
  }


  goToRestaurantPage() {
    if (!this.restaurant) return;

    console.log('Open restaurant page', this.restaurant);
  }
 getStarFill(index: number, overRating?: number): number {
  const rating = overRating ?? this.overallrating();

  const fullStars = Math.floor(rating);
  const fraction = rating - fullStars;

  if (index < fullStars) return 100;
  if (index === fullStars) return fraction * 100;
  return 0;
}
   toggleMap() {
  this.isClickMarker.set(false);
  this.isFullMap.set (!this.isFullMap());
}
 onInput(event:Event){
   const value = (event.target as HTMLInputElement).value;
   this.keywordChange.emit(value);
}
 getRating(restaurant: RestaurantModel): number {
  if (!restaurant.reviewCount) return 0;

  return Number(
    (restaurant.overallRating / restaurant.reviewCount).toFixed(1)
  );
}
 onTap(){
 this.router.navigate(['/restaurantdetail']);
 }
  onSubmit() {
    
  }
//map

 private  async renderMarkers(restaurants: RestaurantModel[]) {
     if (!isPlatformBrowser(this.platformId)) return;

  const L = await import('leaflet');
   this.markerLayer.clearLayers();
   if(restaurants.length!=0){
   

    restaurants.forEach((res) => {
      if (!res.lat || !res.lon) return;
       const ratingText =
  !res.reviewCount || res.reviewCount === 0
    ? '-- ★'
    : `${(res.overallRating / res.reviewCount).toFixed(1)} ★`;
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-wrapper">
            <div class="marker-box">
              <i class="fa-solid fa-utensils marker-icon"></i>
              <span class="marker-text">${ratingText} </span>
            </div>
            <div class="marker-arrow"></div>
          </div>
        `,
        iconSize: [70, 40],
        iconAnchor: [35, 40],
      });

      const marker = L.marker([res.lat, res.lon], { icon });

      marker.on('click', () => {
        this.restaurant = res;
        this.isFullMap.set(true);
        this.isClickMarker.set(true);
              const overallRating: number =
  !res.reviewCount || res.reviewCount === 0
    ? 0
    : Number((res.overallRating / res.reviewCount).toFixed(1));

  this.overallrating.set(overallRating)
        this.map.setView([res.lat, res.lon], 17, { animate: true });
      });

      marker.addTo(this.markerLayer);
    });
   }else{
 const ratingText = '-- ★'

const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div class="marker-wrapper">
      <div class="marker-box">
        <i class="fa-solid fa-utensils marker-icon"></i>
        <span class="marker-text">${ratingText}</span>
      </div>
      <div class="marker-arrow"></div>
    </div>
  `,
  iconSize: [70, 40],
  iconAnchor: [35, 40], 
});
 // maker
      const marker = L.marker([21.0285, 105.8542],{
  icon: customIcon
}).addTo(this.map);
 marker.on('click', () => {
   this.isFullMap.set (true);
   this.isClickMarker.set(true);

});
   }
  }
  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
    
      const L = await import('leaflet');

      this.map = L.map('map', {
        center: [21.0285, 105.8542], 
        zoom: 13,
      });
this.markerLayer = L.layerGroup().addTo(this.map);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
  const ratingText = '-- ★'
  

const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `
    <div class="marker-wrapper">
      <div class="marker-box">
        <i class="fa-solid fa-utensils marker-icon"></i>
        <span class="marker-text">${ratingText}</span>
      </div>
      <div class="marker-arrow"></div>
    </div>
  `,
  iconSize: [70, 40],
  iconAnchor: [35, 40], 
});

// maker
      const marker = L.marker([21.0285, 105.8542],{
  icon: customIcon
}).addTo(this.map);

  marker.on('click', () => {
   this.isFullMap.set (true);
   this.isClickMarker.set(true);
  
});

 this.activateroute.queryParams.subscribe(params => {
const title = params['title'] ?? '';
const keyword = params['keyword'] ?? '';
const cuisine =params['cuisine']?? '';
this.title.set(title)
console.log('title:', this.title);
console.log('keyword:', keyword);
console.log('cuisine',cuisine)
switch (this.title()) {
  case 'restaurantcuisine':
    this.store.dispatch(
    loadRestaurantCuisine({ osmId: keyword ,cuisine:cuisine})
    );
    break;

  case 'restaurantnew':
    this.store.dispatch(
      loadRestaurantNew({ osmId: keyword })
    );
    break;

  case 'restaurantavail':
    this.store.dispatch(
      loadRestaurantAvail({ osmId: keyword })
    );
    break;

  default:
    break;
}
this.isSetView.set(true);
      });

      setTimeout(() => this.map.invalidateSize(), 200);
    }
  }
}
