import { Component, effect, signal } from '@angular/core';
import { Header } from '../components/header/header';
import { RouterOutlet,Router, NavigationEnd  } from '@angular/router';
import { Footer } from '../components/footer/footer';
import { selectUser, selectUserLoading } from '../store/user/user.selectors';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { UserModel } from '../model/user/user.model';
import { checkToken } from '../store/user/user.actions';


@Component({
  selector: 'app-layout',
  imports: [Header,RouterOutlet,Footer],
   templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
   isSticky = signal(false);
   keyword = signal('');
   avatarColor=signal<string>('');
   isScrolling =  signal(false);
    hasSearched = signal(false);
  
    constructor(){
      
   this.avatarColor.set(this.getRandomColor());
    }
  onActivate(event: any) {

    if (event.avatarColor) {
     
       event.avatarColor=this.avatarColor;
      
      
    }
    if (event.hasSearched) {

   event.hasSearched =this.hasSearched;
    }
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
onhasSearch(value:boolean){
this.hasSearched.set(value)
}

getRandomColor(): string {
  let r = 0, g = 0, b = 0;

  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  } while (
  
    (r > 240 && g > 240 && b > 240) ||
    
    (r > 200 && g < 80 && b < 80)
  );

  return `rgb(${r}, ${g}, ${b})`;
}

}
