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
   keyword = signal('');
     isScrolling =  signal(false);

  onActivate(event: any) {
if (event.isScrolling && event.isScrollingChange) {
     
       event.isScrolling=this.isScrolling;
      
      
      event.isScrollingChange.subscribe((value: boolean) => {
        this.isScrolling.set(value);
      });
    }


 if (event.keyword && event.keywordChange) {
     
       event.keyword=this.keyword;
      
      
      event.keywordChange.subscribe((value: string) => {
        this.keyword.set(value);
      });
    }
    if (event.stickyChange) {
   
      event.stickyChange.subscribe((sticky: boolean) => {
        this.isSticky.set(sticky); 
        
      });
    }
  }

onScrollingChange(value: boolean) {
  console.log('Con đang scroll:', value);
  this.isScrolling.set(value); 
}
}
