import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
@Component({
  selector: 'app-header',
  imports: [CommonModule,  FormsModule],
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
  sticky=input<boolean>(false);
  isScrollingChange = output<boolean>();
  selectedWard:string = 'Hoàn Kiếm';
  phoneNumber:string = '';
  email:string='';
  wards :{ward:string,count:number}[] = [
    { ward: 'Hoàn Kiếm', count: 34 },
    { ward: 'Ba Đình', count: 21 },
    { ward: 'Đống Đa', count: 45 },
    { ward: 'Hai Bà Trưng', count: 18 }
  ];
    formData:RegisterFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  
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
    this.showSearch =!this.showSearch;
  }
  toggleWard(){
  this.showWard.set(!this.showWard());
  }

  onTap(){
 this.router.navigate(['/wardrestaurant']);
 }
selectWard(item: {ward:string ,count:number}, event: Event) {
     
    this.selectedWard = item.ward;
    this.router.navigate(['/wardrestaurant']);
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
  constructor(private router:Router){}
}
