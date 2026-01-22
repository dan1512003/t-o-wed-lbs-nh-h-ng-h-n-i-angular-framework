import { CommonModule } from '@angular/common';
import { Component, input, signal, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DietModel } from '../../model/diet/diet.model';

@Component({
  selector: 'app-cuisine-scroll',
  imports: [CommonModule],
  templateUrl: './cuisine-scroll.html',
  styleUrl: './cuisine-scroll.scss',
})
export class CuisineScroll {

  
  cuisines=  input<DietModel[]>([]);
   osmId=input<string>('');
  itemCount = 10;
  scrollAmount = 200;

  canScrollLeft = signal(false);
  canScrollRight = signal(false);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;



  constructor(private router: Router) {
 
  }

  ngAfterViewChecked() {

    this.checkScroll();

}


  checkScroll() {
    const el = this.scrollContainer.nativeElement;
    this.canScrollLeft.set(el.scrollLeft > 0);
    this.canScrollRight.set(el.scrollLeft + el.clientWidth < el.scrollWidth);
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
  }

  goToCuisine(cuisine:string) {
    console.log('osmid',this.osmId())
      this.router.navigate(['/viewall'], {
      queryParams: {
        keyword: this.osmId(),
        title:"restaurantcuisine",
        cuisine:cuisine
      }
    });
  }

}
