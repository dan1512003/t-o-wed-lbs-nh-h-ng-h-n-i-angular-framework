import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, input, output, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all',
  imports: [CommonModule],
  templateUrl: './view-all.html',
  styleUrl: './view-all.scss',
})
export class ViewAll {
  totalStars :number = 5;
  overallrating : number = 4.2;
  stickyChange = output<boolean>();
  keyword = input<string>('');    
  keywordChange = output<string>();
  isFullMap= signal<boolean>(false);
  isClickMarker= signal<boolean>(false);
    restaurant: any = {
    name: 'Pizza House',
    image: 'https://via.placeholder.com/400x200', 
    openingHour: '09:00 AM - 10:00 PM',
    overallRating: 18, 
    reviewCount: 5 
  };
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    
    private router:Router,
  ) {


     
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
  getStarFill(index: number): number {
  const fullStars = Math.floor(this.overallrating);
  const fraction = this.overallrating - fullStars;

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

 onTap(){
 this.router.navigate(['/restaurantdetail']);
 }
  onSubmit() {
    
  }
//map
  private map: any;

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
    
      const L = await import('leaflet');

      this.map = L.map('map', {
        center: [21.0285, 105.8542], 
        zoom: 13,
      });

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
      setTimeout(() => this.map.invalidateSize(), 200);
    }
  }
}
