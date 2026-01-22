import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, input, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';

@Component({
  selector: 'app-town-scroll',
  imports: [CommonModule],
  templateUrl: './town-scroll.html',
  styleUrl: './town-scroll.scss',
})
export class TownScroll{
  
  itemCount = 5;
  wards = input<RestaurantModel[]>([]);
  osmId=input<string>('');
  totalStars :number = 5;
 overallrating  = signal<number>(0);
  canScrollLeft = signal(false);
  canScrollRight = signal(false);
  starIndexes = Array.from({ length: this.totalStars }, (_, i) => i);

  scrollAmount = 300;

  @ViewChild('scrollContainer')
  scrollContainer!: ElementRef<HTMLDivElement>;

  

  constructor(private router: Router) {

    
  }

  ngAfterViewInit() {
   
      // this.checkScroll();
  

    
  }
ngAfterViewChecked() {

    this.checkScroll();

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
  checkScroll() {
    console.log("checkScroll")
    const el = this.scrollContainer.nativeElement;

    this.canScrollLeft.set(el.scrollLeft > 0);
    this.canScrollRight.set(
      el.scrollLeft + el.clientWidth < el.scrollWidth
    );
    console.log("checkScroll Right",  el.scrollLeft + el.clientWidth < el.scrollWidth)
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -this.scrollAmount,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: this.scrollAmount,
      behavior: 'smooth',
    });
  }

  goToWard(item: any) {
    console.log(item);
  }

  goToAll() {
    console.log('osmid',this.osmId())
      this.router.navigate(['/viewall'], {
      queryParams: {
        keyword: this.osmId(),
        title:"restaurantavail"
      }
    });
   
  }
}
