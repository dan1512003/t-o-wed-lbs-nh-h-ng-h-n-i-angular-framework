import { CommonModule } from '@angular/common';
import { Component, input, signal, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuisine-scroll',
  imports: [CommonModule],
  templateUrl: './cuisine-scroll.html',
  styleUrl: './cuisine-scroll.scss',
})
export class CuisineScroll {

  
 cuisines=  input<any[]>([]);

  itemCount = 10;
  scrollAmount = 200;

  canScrollLeft = signal(false);
  canScrollRight = signal(false);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  private resizeObserver!: ResizeObserver;

  constructor(private router: Router) {
 
  }

  ngAfterViewInit() {
  this.checkScroll()

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

  goToCuisine() {
    
  }
  goToAll(){}
}
