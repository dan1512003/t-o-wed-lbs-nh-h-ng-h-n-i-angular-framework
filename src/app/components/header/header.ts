import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showUser = false;
  showSearch = false;

  keyword = input<string>('');    
  keywordChange = output<string>();
  sticky=input<boolean>(false);
  ngOnInit() {
  
  }
 
onInput(event:Event){
   const value = (event.target as HTMLInputElement).value;
   this.keywordChange.emit(value);
}
  toggleUser() {
    this.showUser = !this.showUser;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}
