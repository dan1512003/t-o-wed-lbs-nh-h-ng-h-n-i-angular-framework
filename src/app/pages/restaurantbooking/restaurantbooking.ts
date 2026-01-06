import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface CalendarDay {
  date: Date;
  isOtherMonth: boolean;
  isToday: boolean;
  isSelected: boolean  | null;
}
@Component({
  selector: 'app-restaurantbooking',
  imports: [CommonModule],
  templateUrl: './restaurantbooking.html',
  styleUrl: './restaurantbooking.scss',
})
export class Restaurantbooking {
showCalendar = false;
  selectedDate: Date | null = null;
  focusedMonth = new Date();
  days: CalendarDay[] = [];
  keyword = '';

  ngOnInit() {
    this.renderCalendar();
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  prevMonth() {
    const today = new Date();
    if (
      this.focusedMonth.getFullYear() === today.getFullYear() &&
      this.focusedMonth.getMonth() === today.getMonth()
    ) {
      return; 
    }
    this.focusedMonth.setMonth(this.focusedMonth.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.focusedMonth.setMonth(this.focusedMonth.getMonth() + 1);
    this.renderCalendar();
  }

  get monthLabel(): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${monthNames[this.focusedMonth.getMonth()]} ${this.focusedMonth.getFullYear()}`;
  }

  getDaysInMonth(monthDate: Date): Date[] {
    const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const daysBefore = first.getDay() % 7;
    const firstToShow = new Date(first);
    firstToShow.setDate(first.getDate() - daysBefore);

    const last = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    const daysAfter = 6 - (last.getDay() % 7);
    const lastToShow = new Date(last);
    lastToShow.setDate(last.getDate() + daysAfter);

    const days: Date[] = [];
    for (let d = new Date(firstToShow); d <= lastToShow; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  }

  renderCalendar() {
    const today = new Date();
    const focusedMonth = this.focusedMonth.getMonth();
    const days = this.getDaysInMonth(this.focusedMonth);

    this.days = days.map(day => {
      const isOtherMonth = day.getMonth() !== focusedMonth || 
        (day.getFullYear() === today.getFullYear() &&
         day.getMonth() === today.getMonth() &&
         day.getDate() < today.getDate());

      const isToday =
        day.getDate() === today.getDate() &&
        day.getMonth() === today.getMonth() &&
        day.getFullYear() === today.getFullYear();

      const isSelected =
        this.selectedDate &&
        day.toDateString() === this.selectedDate.toDateString();

      return { date: new Date(day), isOtherMonth, isToday, isSelected };
    });
  }

  selectDay(day: CalendarDay) {
    if (day.isOtherMonth) return; 
    this.selectedDate = day.date;
    this.showCalendar = false;
    this.renderCalendar();
  }

  onSubmit() {
    console.log('Searching:', {
      keyword: this.keyword,
      date: this.selectedDate,
    });
  }
}
