import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../model/user/user.model';

//action checkphone
export const checkPhone = createAction(
  '[User] Check Phone',
  props<{ phone: string }>()
);

export const checkPhoneSuccess = createAction(
  '[User] Check Phone Success',
  props<{ data: any[] }>()
);

export const checkPhoneFailure = createAction(
  '[User] Check Phone Failure',
  props<{ error: string }>()
);

//action checkemail
export const checkEmail = createAction(
  '[User] Check Email',
  props<{ email: string; phone?: string }>()
);

export const checkEmailSuccess = createAction(
  '[User] Check Email Success',
  props<{ user:  UserModel | null }>()
);

export const checkEmailFailure = createAction(
  '[User] Check Email Failure',
  props<{ error: string }>()
);

//action checktoken
export const checkToken = createAction('[User] Check Token');

export const checkTokenSuccess = createAction(
  '[User] Check Token Success',
  props<{ user: UserModel | null }>()
);

export const checkTokenFailure = createAction(
  '[User] Check Token Failure',
  props<{ error: string }>()
);

//action saveuser
export const saveUser = createAction(
  '[User] Save User',
  props<{
    email: string;
    phone: string;
    lastname: string;
    firstname: string;
  }>()
);

export const saveUserSuccess = createAction(
  '[User] Save User Success',
  props<{ user:  UserModel | null }>()
);

export const saveUserFailure = createAction(
  '[User] Save User Failure',
  props<{ error: string }>()
);

//action edituser
export const editUser = createAction(
  '[User] Edit User',
  props<{
    email: string;
    phone: string;
    lastname: string;
    firstname: string;
    oldemail:string
  }>()
);

export const editUserSuccess = createAction(
  '[User] Edit User Success',
  props<{ user:  UserModel | null }>()
);

export const editUserFailure = createAction(
  '[User] Edit User Failure',
  props<{ error: string }>()
);

// user.actions.ts
export const logout = createAction('[User] Logout');

export const logoutSuccess = createAction(
  '[User] Logout Success',
  props<{ user: null }>()
);

export const logoutFailure = createAction(
  '[User] Logout Failure',
  props<{ error: string }>()
);

//clearUserError
export const clearUserError = createAction(
  '[User] Clear Error'
);
