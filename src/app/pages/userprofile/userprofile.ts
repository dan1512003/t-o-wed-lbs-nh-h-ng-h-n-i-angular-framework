import { Component, effect, input, signal } from '@angular/core';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { selectUser, selectUserLoading } from '../../store/user/user.selectors';
import { UserModel } from '../../model/user/user.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-userprofile',
  imports: [CommonModule,RouterOutlet,  RouterLink,
    RouterLinkActive],
  templateUrl: './userprofile.html',
  styleUrl: './userprofile.scss',
})
export class Userprofile {
  user = signal<UserModel | null>(null);
   avatarColor= input<string>();
  resultuser = this.store.selectSignal(selectUser);
  loadingUser = this.store.selectSignal(selectUserLoading);
constructor(private store:Store<AppState>,private router:Router,){
    effect(() => {
    const resultuser = this.resultuser();
    const loading = this.loadingUser();

    
    if (!loading && !resultuser) {
      this.router.navigate(['/']); 
      return;
    }

    this.user.set(resultuser);
  });
 effect(() => {
 

 const resultuser= this.resultuser();
  console.log(' RESULTS USER111:',resultuser);
    console.log(' RESULTS USER:',this.loadingUser());
  this.user.set(resultuser)


    
});
}
 getFirstLetter(name: string): string {
  if (!name) return '';
  return name.trim().charAt(0).toUpperCase();
}
}
