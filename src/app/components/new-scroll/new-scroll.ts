import { CommonModule } from '@angular/common';
import { Component, input, ViewChild ,ElementRef, signal} from '@angular/core';
import { RestaurantModel } from '../../model/restaurant/restaurant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-scroll',
  imports: [CommonModule],
  templateUrl: './new-scroll.html',
  styleUrl: './new-scroll.scss',
})
export class NewScroll {
  itemCount:number = 5;
  wards = input<RestaurantModel[]>([]);
  osmId=input<string>('');
  totalStars :number = 5;
  overallrating  = signal<number>(0);
  starIndexes = Array.from({ length: this.totalStars }, (_, i) => i);
  canScrollLeft=signal<boolean>(false);
  canScrollRight= signal<boolean>(false);
  scrollAmount:number = 300;

    constructor(private router: Router) {

    
  }
//  ngAfterViewInit() {
//   this.checkScroll();
// }

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
  goToWard(item: any) {
    console.log(item);
  }
   goToAll() {
    console.log('osmid',this.osmId())
      this.router.navigate(['/viewall'], {
      queryParams: {
        keyword: this.osmId(),
        title:"restaurantnew"
      }
    });
   
  }
}
