import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID, output } from '@angular/core';

interface CalendarDay {
  date: Date;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelected: boolean | null;
}

@Component({
  selector: 'app-find',
  imports: [CommonModule],
  templateUrl: './find.html',
  styleUrl: './find.scss',
})
export class Find implements AfterViewInit {
  stickyChange = output<boolean>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnDestroy() {
    this.stickyChange.emit(false);
  }

  // ngOnInit() {
   
  // }


 
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

      setTimeout(() => this.map.invalidateSize(), 200);
    }
  }
}
