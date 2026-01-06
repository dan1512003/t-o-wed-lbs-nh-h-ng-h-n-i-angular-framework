import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  keyword = '';

  ngOnInit() {
   
  }

  

  onSubmit() {
    console.log('Searching:', {
      keyword: this.keyword
    });
  }
}
