import { CommonModule } from '@angular/common';
import { Component, input} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  sticky=input<boolean>(false);
  ngOnInit() {
   
    
  }



showUser = false;
  showSearch = false;

  toggleUser() {
    this.showUser = !this.showUser;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}
