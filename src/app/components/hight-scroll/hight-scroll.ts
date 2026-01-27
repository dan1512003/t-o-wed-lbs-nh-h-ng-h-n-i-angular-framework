import { CommonModule } from '@angular/common';
import { Component, input, ViewChild ,ElementRef, signal} from '@angular/core';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hight-scroll',
  imports: [CommonModule],
  templateUrl: './hight-scroll.html',
  styleUrl: './hight-scroll.scss',
})
export class HightScroll {
  itemCount:number = 5;
  wards = input<RestaurantModel[]>([]);
    osmId=input<string>('');
  totalStars :number = 5;
  starIndexes = Array.from({ length: this.totalStars }, (_, i) => i);

 overallrating  = signal<number>(0);
  canScrollLeft =  signal<boolean> (false);
  canScrollRight = signal<boolean> (false);
  scrollAmount:number = 300;
ngAfterViewChecked() {

    this.checkScroll();

}
 @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

 
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
  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -this.scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }


checkScroll() {
  const el = this.scrollContainer.nativeElement;
    this.canScrollLeft.set(el.scrollLeft > 0);
  this.canScrollRight.set(el.scrollLeft + el.clientWidth < el.scrollWidth);
}
  goToWard(item: RestaurantModel) {
        this.router.navigate(['/restaurantdetail'], {
      queryParams: {
        osmid: item.osmId
      }
    });
  }
  constructor(private router: Router){}
}
