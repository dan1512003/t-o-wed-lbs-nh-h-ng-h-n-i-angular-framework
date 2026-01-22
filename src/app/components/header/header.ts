import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { selectResults } from '../../store/search/search.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { search } from '../../store/search/search.actions';
import { loadRestaurantByWard, WardRestaurantCount } from '../../store/restaurantward/restaurantward.actions';
import { selectRestaurantWardData, selectRestaurantWardLoading } from '../../store/restaurantward/restaurantward.selectors';
import { WardModel } from '../../model/ward/ward.model';
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule,  FormsModule,ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isEmail:boolean =false;
  isLogin:boolean=true;
  showUser:boolean = false;
  showSearch:boolean = false;
  showSheet:boolean =false;
  scrollPosition = 0;
  showWard =signal<boolean>(false);
  keyword = input<string>('');    
  keywordChange = output<string>();
  hasSearchedEmit =output<boolean>();
  sticky=input<boolean>(false);
  isScrollingChange = output<boolean>();
  selectedWard:string = 'Hoàn Kiếm';
  phoneNumber:string = '';
  email:string='';
  wards =signal<WardRestaurantCount[]>([]);
   resultsward = this.store.selectSignal(selectRestaurantWardData );
    loadingRestaurant = this.store.selectSignal(selectRestaurantWardLoading);
  items = signal<NominatimPlace[]>([]);
    results = this.store.selectSignal(selectResults);
    searchControl = new FormControl('');
    formData:RegisterFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  
  ngOnInit() {
   
 this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(value => {
      console.log('INPUT VALUE:', value);

      if (value?.trim()) {
  
         this.keywordChange.emit(value);
        this.store.dispatch(search({ query: value }));
      } else {
   
        this.items.set([]);          
        this.store.dispatch(search({ query: '' }));
      }
    });
 this.store.dispatch(loadRestaurantByWard());
}

 findByPick(item: NominatimPlace) {
  console.log('Picked item:', item);

  
  this.items.set([]);


  this.searchControl.setValue(item.name, {
    emitEvent: false 
  });



}

  toggleUser() {
    this.showUser = !this.showUser;
  }

  toggleSearch() {
    this.showSearch =!this.showSearch;
    if(this.showSearch===false){
      this.hasSearchedEmit.emit(this.showSearch)
      this.items.set([]);          
       this.store.dispatch(search({ query: '' }));
      
    }else{
this.hasSearchedEmit.emit(this.showSearch)
this.items.set([]);          
this.store.dispatch(search({ query: '' }));
this.searchControl.setValue(this.keyword(), {
  emitEvent: false
});
 

    }
  }
  toggleWard(){
  this.showWard.set(!this.showWard());
  }

  onTap(){
 this.router.navigate(['/wardrestaurant']);
 }
selectWard(ward:WardModel, event: Event) {
     
    this.selectedWard = ward.name;


   this.router.navigate(['/wardrestaurant'], {
      queryParams: {
        osmId: ward.osmId
      }
    });

    // this.router.navigate(['/wardrestaurant']);
    event.stopPropagation();
    this.showWard.set(!this.showWard());
   
  }

  onSubmit() {
    
  }


   openSheet() {

  this.isScrollingChange.emit (true);
 this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

 
  document.body.style.position = 'fixed';
  document.body.style.top = `-${this.scrollPosition}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  this.showSheet = true;
  console.log('Add Review clicked');
}

closeSheet() {

document.body.style.position = '';
document.body.style.top = '';
document.body.style.left = '';
document.body.style.right = '';
document.body.style.width = '';
 window.scrollTo(0, this.scrollPosition);
this.isScrollingChange.emit (false);
  this.showSheet = false;

}
 


handleNext() {
  if(!this.isLogin){
  console.log(this.formData);
   this.router.navigate(['/userprofile']);
    this.showSheet = false;
  }else{
  if(this.isEmail){
   this.isLogin=false;
  }else{
 console.log('Phone number:', this.phoneNumber);
  }

  }
  
  }
 

  goToEmail() {
  this.isEmail=true;
  }
   goToPhone() {
  this.isEmail=false;
  }
  constructor(private router:Router,private store:Store<AppState>){

effect(() => {



  const results = this.results();
  console.log(' RESULTS UPDATED:', results);
  this.items.set(results);
});


effect(() => {



  const resultsward = this.resultsward();
  console.log(' RESULTS UPDATED:', resultsward);
  this.wards.set(resultsward);
});
  }
}
