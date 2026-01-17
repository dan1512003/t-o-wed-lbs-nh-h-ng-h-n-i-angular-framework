import { CommonModule } from '@angular/common';
import { Component, effect, input, output, ViewChild ,ElementRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TownScroll } from '../../components/town-scroll/town-scroll';
import { HightScroll } from '../../components/hight-scroll/hight-scroll';
import { NewScroll } from '../../components/new-scroll/new-scroll';
import { CuisineScroll } from '../../components/cuisine-scroll/cuisine-scroll';

@Component({
  selector: 'app-wardrestaurant',
  imports: [CommonModule,FormsModule,TownScroll,HightScroll,NewScroll,CuisineScroll],
  templateUrl: './wardrestaurant.html',
  styleUrl: './wardrestaurant.scss',
})
export class Wardrestaurant {
  keyword = input<string>('');    
  keywordChange = output<string>();

  cuisines=[

 { diet: 'American', image: '' },{ diet: 'Chinese', image: '' },{ diet: 'Russian', image: '' },
  { diet: 'Italian', image: '' },
  { diet: 'Mexican', image: '' },
  { diet: 'French', image: '' },
  { diet: 'Japanese', image: '' },
  { diet: 'Indian', image: '' },
  { diet: 'Thai', image: '' },
  { diet: 'Korean', image: '' },
  { diet: 'Mediterranean', image: '' },
  { diet: 'Vietnam', image: '' },
  

]

   wards = [
    {
      ward: { name: 'Hoàn Kiếm', image: '', osmId: 1 },
      count: 34
    },
    {
      ward: { name: 'Ba Đình', image: '', osmId: 2 },
      count: 21
    },
    
  ];
constructor(private router: Router) {
  
    effect(() => {
      console.log('Keyword changed:', this.keyword());
    });
  }
   onSubmit() {
  this.router.navigate(['/find'], {
    queryParams: {
      keyword: this.keyword()  
    }
  });
}
  onInput(event:Event){
   const value = (event.target as HTMLInputElement).value;
   this.keywordChange.emit(value);
}



  

 
}
