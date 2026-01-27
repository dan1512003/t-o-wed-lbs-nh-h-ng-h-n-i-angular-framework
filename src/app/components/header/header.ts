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
import { checkEmail, checkPhone, checkToken, logout, saveUser } from '../../store/user/user.actions';
import { UserModel } from '../../model/user/user.model';
import { selectPhoneResult, selectUser, selectUserLoading } from '../../store/user/user.selectors';
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
  isSignin:boolean=false;
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

  
  phone = signal< any[]>([]);
  isclick =signal<boolean>(false);
  selectedWard:string = 'Hoàn Kiếm';
  phoneNumber:string = '';
  email:string='';
  wards =signal<WardRestaurantCount[]>([]);
   resultsward = this.store.selectSignal(selectRestaurantWardData);
     user = signal<UserModel | null>(null);
   resultuser = this.store.selectSignal(selectUser);
   resultphone =this.store.selectSignal(selectPhoneResult);
    loadingRestaurant = this.store.selectSignal(selectRestaurantWardLoading);
    loadingUser = this.store.selectSignal(selectUserLoading);
  items = signal<NominatimPlace[]>([]);
  avatarColor= input<string>();
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
onProfile(){
   this.router.navigate(['/userprofile']);
}
onLogout(){
this.store.dispatch(logout());
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
  this.isLogin =true;
  this.isSignin =false;
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
  
  if( !this.showSheet){
    return; 
  }
  if(!this.isLogin){
 this.store.dispatch(saveUser({
  phone:this.formData.phone,
  email:this.formData.email,
  lastname:this.formData.lastName,
 firstname:this.formData.firstName,
}));
  }else{
  if(this.isEmail){

     if (this.phone().length > 0) {
   this.store.dispatch(checkEmail({phone:this.phoneNumber,email:this.email }));
  }else{
    this.store.dispatch(checkEmail({email:this.email }));
  }
  this.isLogin =false;
  }else{
    this.isclick.set(true)
 console.log('Phone number:', this.phoneNumber);
  console.log(' RESULTS USER:',this.loadingUser());
  this.store.dispatch(checkPhone({phone:this.phoneNumber}));
 
  }

  }
  
  }
 

  goToEmail() {
  this.isEmail=true;
  this.isclick.set(false);
  }
   goToPhone() {
  this.isEmail=false;
  }
  constructor(private router:Router,private store:Store<AppState>){
 
effect(() => {
  const resultphone= this.resultphone();
  console.log(' RESULTS Phone:',resultphone);
  this.phone.set(resultphone);
  if (resultphone && resultphone.length > 0) {
    this.isEmail = true;
    return;
  }
   
    setTimeout(() => {
      this.isclick.set(false)
    }, 5000);
  
});
 
 effect(() => {
 

 const resultuser= this.resultuser();
  console.log(' RESULTS USER111:',resultuser);
    console.log(' RESULTS USER:',this.loadingUser());
  this.user.set(resultuser)
   if(this.showSheet){
         if(resultuser !=null){
             this.showSheet = false;
           this.closeSheet();
        this.isLogin =true;
  this.isSignin =false;
     this.router.navigate(['/userprofile']);
    
  }else{
if(!this.isSignin){
    if( !this.isLogin){
        this.isSignin =true;
   
  }
}
  }

     }

    
});
 effect(() => {
  const results = this.results();
  console.log(' RESULTS UPDATED:', results);
  this.items.set(results);
});

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

  getFirstLetter(name: string): string {
  if (!name) return '';
  return name.trim().charAt(0).toUpperCase();
}

}
