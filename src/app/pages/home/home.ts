import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  keyword = input<string>('');    
  keywordChange = output<string>();
constructor(private router: Router) {
  
    effect(() => {
      console.log('Keyword changed:', this.keyword());
    });
  }
  ngOnInit() {
   
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
