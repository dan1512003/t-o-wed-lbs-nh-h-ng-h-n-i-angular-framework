import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantdetail',
  imports: [CommonModule],
  templateUrl: './restaurantdetail.html',
  styleUrl: './restaurantdetail.scss',
})
export class Restaurantdetail {
  activeSection = signal<string>('');
  overallrating : number = 4.2; 
  totalStars :number = 5;
  isScrolling =  input<boolean>(false);
  isScrollingChange = output<boolean>();
  showRateSheet :boolean = false;
  scrollPosition = 0;
   ratingBars = [
    { score: 5, width: '80%' },
    { score: 4, width: '60%' },
    { score: 3, width: '35%' },
    { score: 2, width: '15%' },
    { score: 1, width: '5%' },
  ];

  ratings = [
  { label: 'Food', score: 4.7 },
  { label: 'Service', score: 4.7 },
  { label: 'Ambicent', score: 4.7 }
];
//hàm add review for user
 

 categoryRatings = signal([
    { name: 'Food', rate: 4 },
    { name: 'Service', rate: 4 },
    { name: 'Ambicent', rate: 4 },
    { name: 'Overallrating', rate: 4 },
  ]);

 
  firstThreeCategories = () => this.categoryRatings().slice(0, 3);

  isStarActiveUser(starIndex: number, rate: number): boolean {
    return starIndex < rate;
  }

  setStar(categoryIndex: number, starIndex: number) {
    this.categoryRatings.update(categories => {
      categories[categoryIndex].rate = starIndex + 1;
      return [...categories];
    });
  }



  
      
   
ngAfterViewInit() {
    
   if (typeof window !== 'undefined') {
    window.addEventListener('scroll', this.onScroll.bind(this));
    this.onScroll();
  }
  }
  //hàm tô sao theo đánh giá của khách hàng
isStarActive(index: number, rating: number): boolean {
  return index < rating;
}
  //hàm tô sao theo overallrating
getStarFill(index: number): number {
  const fullStars = Math.floor(this.overallrating);
  const fraction = this.overallrating - fullStars;

  if (index < fullStars) return 100;        
  if (index === fullStars) return fraction * 100; 
  return 0;                                  
}
  onScroll() {
     if (this.isScrolling()) return;
    const sections = ['direction', 'menu', 'review', 'detail'];
    const scrollPos = window.pageYOffset + 125;

    for (let i = 0; i < sections.length ; i++) {
      const sectionEl = document.getElementById(sections[i]);
      const height = sectionEl?.offsetHeight;
      if(height==null)break;
      if (sectionEl && scrollPos <= sectionEl.offsetTop+height) {
        console.log('id click is:', sections[i]);
        this.activeSection.set(sections[i]);
        break;
      }
    }
  }
scrollTo(sectionId: string) {

     this.isScrollingChange.emit(true)
    this.activeSection.set(sectionId);
    const el = document.getElementById(sectionId);
     console.log('id click is:', sectionId);
    if (el) {
    const headerOffset = 120; 
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
  
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    })
    const checkScroll = () => {
    const currentPos = window.pageYOffset;
    if (Math.abs(currentPos - offsetPosition) < 2) { 
    this.isScrollingChange.emit(false)
      window.removeEventListener('scroll', checkScroll);
    }
  };

  window.addEventListener('scroll', checkScroll);
    }

  }
onTapDirection(){
  this.router.navigate(['/direction']);
}
   onTapReview(){
 this.router.navigate(['/review']);
 }
 openRateSheet() {

 this.isScrollingChange.emit(true)
 this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

 
  document.body.style.position = 'fixed';
  document.body.style.top = `-${this.scrollPosition}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  this.showRateSheet = true;
  console.log('Add Review clicked');
}

closeRateSheet() {
  document.body.style.position = '';
document.body.style.top = '';
document.body.style.left = '';
document.body.style.right = '';
document.body.style.width = '';
 window.scrollTo(0, this.scrollPosition);
   this.isScrollingChange.emit(false)
  this.showRateSheet = false;

}
  constructor(private router:Router){};
}
