import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID, effect, input, output, signal } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectLoadingRestaurant, selectResultsRestaurant } from '../../store/restaurant/restaurant.selectors';

import {  FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { findByClick, findByMove, findBySearch } from '../../store/restaurant/restaurant.actions';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { search } from '../../store/search/search.actions';
import { selectResults } from '../../store/search/search.selectors';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { getCurrentLocation, requestLocationPermission } from '../../store/geolocation/geolocation.action';
import { selectCurrentLocation, selectPermissionGranted } from '../../store/geolocation/geolocation.selectors';




@Component({
  selector: 'app-find',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './find.html',
  styleUrl: './find.scss',
})
export class Find implements AfterViewInit {
  totalStars :number = 5;
  overallrating  = signal<number>(0);
  stickyChange = output<boolean>();
  keyword = input<string>('');    
  keywordChange = output<string>();
  isFullMap = signal<boolean>(false);
  isClickMarker= signal<boolean>(false);
  itemsSearch = signal<NominatimPlace[]>([]);
  itemsRestaurant=signal<RestaurantModel[]>([]);
   hasSearched = input<boolean>();
  resultsRestaurant = this.store.selectSignal(selectResultsRestaurant);
  loadingRestaurant = this.store.selectSignal(selectLoadingRestaurant);
  resultsGeolocation =this.store.selectSignal(selectCurrentLocation);
  resultspermission =this.store.selectSignal(selectPermissionGranted);
   resultsSearch = this.store.selectSignal(selectResults);
   isSearch =signal<boolean>(false);
   isSetView=signal<boolean>(false);
   mapReady = signal(false);


   searchControl = new FormControl('');
     restaurant =signal<RestaurantModel | null>(null)
 private map: any;
private markerLayer: any;
private myLocationMarker?: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private activateroute: ActivatedRoute,
    private router:Router,
    private store:Store<AppState>
  ) {
   
this.store.dispatch( requestLocationPermission());
this.store.dispatch(getCurrentLocation());
effect(() => {
   console.log('permission:', this.resultspermission());
  console.log('location:', this.resultsGeolocation());
  console.log('mapReady:', this.mapReady());
  const permissionGranted = this.resultspermission();
  const location = this.resultsGeolocation();
  const mapReady = this.mapReady();
 console.log('permission:', this.resultspermission());
  console.log('location:', this.resultsGeolocation());
  console.log('mapReady:', this.mapReady());
  if (!mapReady || !permissionGranted || !location) return;

  this.renderMyLocationMarker(location.lat, location.lng);

  this.map.setView([location.lat, location.lng], 16, {
    animate: true,
  });
});



    effect(() => {





  const results = this.resultsRestaurant();
   console.log(' RESULTS UPDATED:', results);
  if (!results || results.length === 0) return;

  this.itemsRestaurant.set(results);


  console.log(' RESULTS UPDATED:', this.itemsRestaurant());
this.renderMarkers(this.itemsRestaurant());

if (this.isSetView()) {
  const first = results[0];
  if (first.lat && first.lon) {

    this.map.once('moveend', () => {
     

      
      this.isSetView.set(false);

      
    });

    this.map.setView([first.lat, first.lon], 17, { animate: true });
  }
  }

 

  
});
effect(()=>{
if(!this.isSearch())return;

   //Search
       if(this.hasSearched()===false){
       
     const results = this.resultsSearch();
 
    this.itemsSearch.set(results);
     const value = this.searchControl.value ?? '';
     this.keywordChange.emit(value);
      }else{
    
      this.searchControl.setValue(this.keyword(), {
      emitEvent: false
      });
      }  
})
  }


  findByPick(item: NominatimPlace) {

  console.log('Picked item:', item);

  
  this.itemsSearch.set([]);


  this.searchControl.setValue(item.name, {
    emitEvent: false 
  });



}
  closeMarker(event: Event) {
   
    this.isClickMarker.set(false);
  }


  goToRestaurantPage() {
    if (!this.restaurant()) return;

      this.router.navigate(['/restaurantdetail'], {
      queryParams: {
        osmid: this.restaurant()?.osmId??""
      }
    });
  }
getStarFill(index: number, overRating?: number): number {
  const rating = overRating ?? this.overallrating();

  const fullStars = Math.floor(rating);
  const fraction = rating - fullStars;

  if (index < fullStars) return 100;
  if (index === fullStars) return fraction * 100;
  return 0;
}
 getRating(restaurant: RestaurantModel): number {
  if (!restaurant.reviewCount) return 0;

  return Number(
    (restaurant.overallRating / restaurant.reviewCount).toFixed(1)
  );
}


  ngOnDestroy() {
    this.stickyChange.emit(false);
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
  
  toggleMap() {
  this.isClickMarker.set(false);
  this.isFullMap.set (!this.isFullMap());
}


 onTap(osmid:string){

    this.router.navigate(['/restaurantdetail'], {
      queryParams: {
        osmid: osmid
      }
    });

 }
  onFind() {
    this.isSetView.set(true);
    const value = this.searchControl.value ?? '';
    this.store.dispatch(findBySearch({ query: value }));
      
  }
  goToMyLocation(){

this.store.dispatch(getCurrentLocation());

  }
//map
 
onMapMoveEnd(event: L.LeafletEvent) {
  if(this.isSetView())return;
  const map = event.target as L.Map;

  const bounds = map.getBounds();
  const center = map.getCenter();

  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  const minLon = sw.lng;
  const minLat = sw.lat;
  const maxLon = ne.lng;
  const maxLat = ne.lat;


console.log('BBox:', {
  minLon,
  minLat,
  maxLon,
  maxLat,
});
   this.store.dispatch(findByMove({ minLat:minLat,minLon:minLon,maxLat:maxLat,maxLon:maxLon}));
}



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
        this.restaurant.set(res)
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
  private async renderMyLocationMarker(lat: number, lng: number) {
  if (!isPlatformBrowser(this.platformId)) return;

  const L = await import('leaflet');

  const icon = L.divIcon({
    className: '',
    html: `<div class="my-location-marker"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  // remove marker cũ nếu có
  if (this.myLocationMarker) {
    this.map.removeLayer(this.myLocationMarker);
  }

  this.myLocationMarker = L.marker([lat, lng], { icon })
    .addTo(this.map);
}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
    
      const L = await import('leaflet');

      this.map = L.map('map', {
        center: [21.0285, 105.8542], 
        zoom: 13,
      });
      this.markerLayer = L.layerGroup().addTo(this.map);
       this.mapReady.set(true);
this.map.on('moveend', (event: L.LeafletEvent) =>
  this.onMapMoveEnd(event)
);

// this.map.on('zoomend', (event: L.LeafletEvent) =>
//   this.onMapMoveEnd(event)
// );

this.map.on('click', (event: L.LeafletMouseEvent) => {
  const { lat, lng } = event.latlng;

  console.log('Click tọa độ:', {
    lat,
    lon: lng,
  });

   this.store.dispatch(findByClick({lat:lat,lon:lng }));
});

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
   
      

      setTimeout(() => this.map.invalidateSize(), 200);
    }
      this.activateroute.queryParams.subscribe(params => {
    const keyword = params['keyword'] ?? '';
       
       console.log("keyword findssss",keyword)
 

         this.searchControl.setValue(keyword, {
    emitEvent: false 
  });

    this.store.dispatch(findBySearch({query:keyword}));
    });
  }
}
