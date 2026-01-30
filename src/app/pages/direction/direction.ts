import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, effect, ElementRef, HostListener, Inject, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { icon } from 'leaflet';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectCurrentLocation, selectPermissionGranted } from '../../store/geolocation/geolocation.selectors';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { selectRestaurant, selectResults, selectRoute } from '../../store/route/route.selectors';
import { getCurrentLocation, requestLocationPermission } from '../../store/geolocation/geolocation.action';
import { clearSearch, findByPick, getRoute, loadRestaurantById, searchRoute } from '../../store/route/route.action';
import { LatLng, RouteStep } from '../../services/route/route';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { search } from '../../store/search/search.actions';

@Component({
  selector: 'app-direction',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './direction.html',
  styleUrl: './direction.scss',
})
export class Direction {
  searchControl = new FormControl('');
   mapReady = signal(false);
   screenWidth = 0;
   isClickMarker= signal(false);
    totalStars :number = 5;
    overallrating  =signal<number>(0) ;
   debounceTimer: any;
   resultsGeolocation =this.store.selectSignal(selectCurrentLocation);
      resultsRestaurant =this.store.selectSignal(selectRestaurant);
     resultspermission =this.store.selectSignal(selectPermissionGranted);
     resultRoute = this.store.selectSignal(selectRoute);
     resultsearch= this.store.selectSignal(selectResults);
     restaurant =signal<RestaurantModel | null>(null)
   private map: any;
private markerLayer: any;
private myLocationMarker?: any;
private routeLayer?: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router:Router,
    private activateroute: ActivatedRoute,
     private store:Store<AppState>
  ){
this.store.dispatch( requestLocationPermission());
this.store.dispatch(getCurrentLocation());

effect(() => {
  const result = this.resultsearch();
console.log("Result Search",result)
 
});

effect(() => {
  const route = this.resultRoute();
    const location = this.resultsGeolocation();
  const mapReady = this.mapReady();
 const results = this.resultsRestaurant();
  if (!mapReady || !route || !route.points?.length ||!results || !location) return;

  this.renderRoute(route.points);
});

effect(() => {
   console.log('permission:', this.resultspermission());
  console.log('location:', this.resultsGeolocation());
  console.log('mapReady:', this.mapReady());
  const permissionGranted = this.resultspermission();
  const location = this.resultsGeolocation();
  const mapReady = this.mapReady();
  const results = this.resultsRestaurant();


   console.log(' RESULTS Restaurant:', results);
 console.log('permission:', this.resultspermission());
  console.log('location:', this.resultsGeolocation());
  console.log('mapReady:', this.mapReady());
  if (!mapReady || !permissionGranted || !location||!results) return;
    this.searchControl.setValue(results.name, {
      emitEvent: false
      });
  this.renderMyLocationMarker(location.lat, location.lng);
  this.renderMarkers(results);
this.store.dispatch(getRoute({
   start:{lat: location.lat,
                   lng:  location.lng} ,
            end:{
                   lat: results.lat,
                   lng:  results.lon

              }}));
  this.map.setView([location.lat, location.lng], 16, {
    animate: true,
  });
});




    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }
 
getStarFill(index: number): number {
  const fullStars = Math.floor(this.overallrating());
  const fraction = this.overallrating() - fullStars;

  if (index < fullStars) return 100;        
  if (index === fullStars) return fraction * 100; 
  return 0;                                  
}
getStepIcon(step: RouteStep): string {
  if (!step) return 'fa-solid fa-location-arrow';



  return getTurnIcon(step.type, step.modifier);
}

getStepText(step: RouteStep): string {
  if (!step) return '';

  if (step.type === 'depart') return 'Vị trí của bạn';
  if (step.type === 'arrive') return this.resultsRestaurant()?.name ?? '';

  return step.instruction;
}

goToMyLocation(){

this.store.dispatch(getCurrentLocation());

  }
  pickResult(item:NominatimPlace){
this.store.dispatch(findByPick({place:item}));
this.store.dispatch( clearSearch());
  }
  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
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
        
              console.log('DISPATCH search:', value);
             this.store.dispatch(searchRoute({ query: value }));
           } else {
              console.log('DISPATCH search: empty');
             this.store.dispatch(searchRoute({ query: '' }));
           }
          
         });
      
  }
//map
 private  async renderMarkers(restaurants: RestaurantModel) {
     if (!isPlatformBrowser(this.platformId)) return;

  const L = await import('leaflet');
   this.markerLayer.clearLayers();
   if(restaurants){
   if (!restaurants.lat || !restaurants.lon) return;
       const ratingText =
  !restaurants.reviewCount || restaurants.reviewCount === 0
    ? '-- ★'
    : `${(restaurants.overallRating / restaurants.reviewCount).toFixed(1)} ★`;
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

      const marker = L.marker([restaurants.lat, restaurants.lon], { icon });

      marker.on('click', () => {
        this.restaurant.set(restaurants)
 
        this.isClickMarker.set(true);
              const overallRating: number =
  !restaurants.reviewCount || restaurants.reviewCount === 0
    ? 0
    : Number((restaurants.overallRating / restaurants.reviewCount).toFixed(1));

  this.overallrating.set(overallRating)
        this.map.setView([restaurants.lat, restaurants.lon], 17, { animate: true });
      });

      marker.addTo(this.markerLayer);

  
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


  if (this.myLocationMarker) {
    this.map.removeLayer(this.myLocationMarker);
  }

  this.myLocationMarker = L.marker([lat, lng], { icon })
    .addTo(this.map);
}
private async renderRoute(points: LatLng[]) {
  if (!isPlatformBrowser(this.platformId)) return;
  if (!this.map) return;

  const L = await import('leaflet');


  const latLngs: [number, number][] = points.map(p => [p.lat, p.lng]);

  // remove route cũ
  if (this.routeLayer) {
    this.map.removeLayer(this.routeLayer);
  }

  const borderLine = L.polyline(latLngs, {
    color: '#ffffff',
    weight: 9,
    opacity: 1,
    lineCap: 'round',
    lineJoin: 'round',
  });

  const mainLine = L.polyline(latLngs, {
    color: '#1A73E8',
    weight: 6,
    opacity: 1,
    lineCap: 'round',
    lineJoin: 'round',
  });

  this.routeLayer = L.layerGroup([borderLine, mainLine])
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
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
 
  this.activateroute.queryParams.subscribe(params => {
    const keyword = params['osmid'] ?? '';
       console.log("osmid:",keyword)
      this.store.dispatch(loadRestaurantById({id:keyword}));
    });
      setTimeout(() => this.map.invalidateSize(), 200);
    }
  }

  closeMarker(event: Event) {
    event.stopPropagation(); 
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
   @ViewChild('panel') panel!: ElementRef<HTMLDivElement>;

  isDragging = false;
  maxOffset = 500; // chiều cao tối đa
  minOffset = 100; // chiều cao tối thiểu

  // signal cho chiều cao panel
  offsetY = signal(100);

  typedirection = [
    { name: 'Xe máy', icon: 'fa-solid fa-motorcycle' },
    { name: 'Xe hơi', icon: 'fa-solid fa-car' }
  ];
  directionselect = 'Xe máy';

  startDrag(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isDragging = true;

    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.endDragSnap);
    document.addEventListener('touchmove', this.onDrag);
    document.addEventListener('touchend', this.endDragSnap);
  }

  getY(event: any) {
    return event.touches ? event.touches[0].clientY : event.clientY;
  }

  onDrag = (event: any) => {
    if (!this.isDragging) return;

    const y = this.getY(event);
    const windowHeight = window.innerHeight;

    let newHeight = windowHeight - y;

    if (newHeight > this.maxOffset) newHeight = this.maxOffset;
    if (newHeight < this.minOffset) newHeight = this.minOffset;

    this.offsetY.set(newHeight); // signal tự trigger re-render
    this.panel.nativeElement.style.height = `${newHeight}px`;
    console.log('offsetY hiện tại (signal):', newHeight);
  }

  endDragSnap = () => {
    if (!this.isDragging) return;
    this.isDragging = false;

    const mid = (this.maxOffset + this.minOffset) / 2;

    if (this.offsetY() >= mid) {
      this.offsetY.set(this.maxOffset);
    } else {
      this.offsetY.set(this.minOffset);
    }

    this.panel.nativeElement.style.height = `${this.offsetY()}px`;

    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.endDragSnap);
    document.removeEventListener('touchmove', this.onDrag);
    document.removeEventListener('touchend', this.endDragSnap);
  }

  selectDirection(index: number) {
    this.directionselect = this.typedirection[index].name;
  }

}
//hàm lấy icon
export function getTurnIcon(type: string, modifier?: string): string {
  if (type === 'turn' || type === 'continue') {
    switch (modifier) {
      case 'right':
        return 'fa-arrow-right';
      case 'left':
        return 'fa-arrow-left';
      case 'slight right':
        return 'fa-arrow-up-right';
      case 'slight left':
        return 'fa-arrow-up-left';
      case 'sharp right':
        return 'fa-angles-right';
      case 'sharp left':
        return 'fa-angles-left';
      default:
        return 'fa-arrow-up';
    }
  }

  if (type === 'roundabout') return 'fa-circle-notch';
  if (type === 'merge') return 'fa-code-merge';
  if (type === 'on ramp') return 'fa-arrow-up';
  if (type === 'off ramp') return 'fa-arrow-right-from-bracket';
  if (type === 'fork') return 'fa-code-branch';
  if (type === 'end of road') return 'fa-hand';
  return 'fa-location-arrow';
}
