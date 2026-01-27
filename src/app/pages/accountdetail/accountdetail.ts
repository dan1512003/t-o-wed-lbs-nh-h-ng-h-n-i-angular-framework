import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { UserModel } from '../../model/user/user.model';
import { selectUser, selectUserError } from '../../store/user/user.selectors';
import { clearUserError, editUser } from '../../store/user/user.actions';
interface RegisterFormData{
  firstName:string,
  lastName:string,
  email:string,
  phone:string
}
@Component({
  selector: 'app-accountdetail',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './accountdetail.html',
  styleUrl: './accountdetail.scss',
})
export class Accountdetail {
formData:RegisterFormData={
firstName:'',
lastName:'',
email:'',
phone:''
}
user =signal<UserModel | null>(null);
resultUser = this.store.selectSignal(selectUser)
isChange = signal<boolean>(false);
oldemail =signal<string>('');
error = signal<string>('');
resultUserError = this.store.selectSignal(selectUserError);
isError = signal<boolean>(false)

constructor(private store: Store<AppState>) {
  effect(() => {
    const resultUser = this.resultUser();
     const resultUserError = this.resultUserError();
if(resultUserError!=null){
  this.isError.set(true);
  this.error.set(resultUserError);
   console.log("error",resultUserError);
}
   
    if (!resultUser) return;

    this.user.set(resultUser);

   

      this.formData = {
        firstName: resultUser.firstName ?? '',
        lastName: resultUser.lastName ?? '',
        email: resultUser.email ?? '',
        phone: resultUser.phone ?? ''
      };
   this.oldemail.set(resultUser.email);
   console.log("oldemail",this.oldemail());
  });
}


onFormChange() {
  if(this.isError()==true){
this.store.dispatch(clearUserError());
  this.isError.set(false);
  }
  
  queueMicrotask(() => {
   const isSameAsUser =
  this.formData.firstName === this.user()?.firstName &&
  this.formData.lastName === this.user()?.lastName &&
  this.formData.email === this.user()?.email &&
  this.formData.phone === this.user()?.phone;

const isFormFilled =
  this.formData.firstName.trim() !== '' &&
  this.formData.lastName.trim() !== '' &&
  this.formData.email.trim() !== '' &&
  this.formData.phone.trim() !== '';


   this.isChange.set(isFormFilled && !isSameAsUser);

  });
}
onSave(){
   this.store.dispatch(editUser({
    phone:this.formData.phone,
    email:this.formData.email,
    lastname:this.formData.lastName,
   firstname:this.formData.firstName,
   oldemail:this.oldemail()
  }));
}

}
