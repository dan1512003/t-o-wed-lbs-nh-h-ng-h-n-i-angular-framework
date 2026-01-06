import { Component, effect, signal } from '@angular/core';
import { Header } from '../components/header/header';
import { RouterOutlet,Router, NavigationEnd  } from '@angular/router';
import { Footer } from '../components/footer/footer';


@Component({
  selector: 'app-layout',
  imports: [Header,RouterOutlet,Footer],
   templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
   isSticky = signal(false);
  onActivate(event: any) {
 
    if (event.stickyChange) {
   
      event.stickyChange.subscribe((sticky: boolean) => {
        this.isSticky.set(sticky); 
        
      });
    }
  }


}
