import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';
interface CalendarDay {
  date: Date;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelected: boolean  | null;
}
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  keyword = input<string>('');    
  keywordChange = output<string>();
constructor() {
  
    effect(() => {
      console.log('Keyword changed:', this.keyword());
    });
  }
  ngOnInit() {
   
  }


  onSubmit() {
   
  }
  onInput(event:Event){
   const value = (event.target as HTMLInputElement).value;
   this.keywordChange.emit(value);
}
}
