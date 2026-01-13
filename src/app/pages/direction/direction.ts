import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { icon } from 'leaflet';

@Component({
  selector: 'app-direction',
  imports: [CommonModule,FormsModule],
  templateUrl: './direction.html',
  styleUrl: './direction.scss',
})
export class Direction {

   screenWidth = 0;
   isClickMarker= signal(true);
   searchText = '';
    totalStars :number = 5;
    overallrating : number = 4.2; 
   debounceTimer: any;
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
  ){


    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }
  results: any[] = [
    { name: 'Nhà hàng A', displayName: 'Phú Thọ Xuân Làng' },
    { name: 'Nhà hàng B', displayName: 'Nguyễn Trãi, Hà Nội' },
    { name: 'Nhà hàng C', displayName: 'Cầu Giấy, Hà Nội' },
  ];
getStarFill(index: number): number {
  const fullStars = Math.floor(this.overallrating);
  const fraction = this.overallrating - fullStars;

  if (index < fullStars) return 100;        
  if (index === fullStars) return fraction * 100; 
  return 0;                                  
}
  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
    }
  }
  onSearchChange() {
    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      if (!this.searchText) {
        this.results = [];
      } else {
        this.search(this.searchText);
      }
    }, 600);
  }

  submitSearch() {
    if (!this.searchText) return;
    this.search(this.searchText);
  }

  search(value: string) {

    this.results = [
      { name: value + ' 1', displayName: 'Phú Thọ Xuân Làng' },
      { name: value + ' 2', displayName: 'Hà Đông, Hà Nội' },
      { name: value + ' 3', displayName: 'Thanh Xuân, Hà Nội' },
    ];
  }

  pickResult(item: any) {
    console.log('Picked:', item);
    this.searchText = item.name;
    this.results = [];
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
  this.isClickMarker.set(true);
  console.log('isClickMarker =', this.isClickMarker);
});


      setTimeout(() => this.map.invalidateSize(), 200);
    }
  }

  closeMarker(event: Event) {
    event.stopPropagation(); 
    this.isClickMarker.set(false);
  }


  goToRestaurantPage() {
    if (!this.restaurant) return;

    console.log('Open restaurant page', this.restaurant);
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
  directionselect = '';

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
