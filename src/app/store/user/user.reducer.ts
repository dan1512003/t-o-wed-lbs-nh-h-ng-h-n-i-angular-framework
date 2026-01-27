import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserModel } from '../../model/user/user.model';

export interface UserState {
  user: UserModel | null;
  loading: boolean;
  phoneResult: any[];
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  phoneResult: [],
  error: null,
};

export const userReducer = createReducer(
  initialState,

  // START loading + reset error
  on(
    UserActions.checkPhone,
    UserActions.checkEmail,
    UserActions.checkToken,
    UserActions.saveUser,
    UserActions.editUser,
    state => ({
      ...state,
      loading: true,
      error: null,
    })
  ),

  // CHECK PHONE SUCCESS
  on(UserActions.checkPhoneSuccess, (state, { data }) => ({
    ...state,
    phoneResult: data,
    loading: false,
    error: null,
  })),

  // CHECK EMAIL SUCCESS
  on(UserActions.checkEmailSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),

  // CHECK TOKEN SUCCESS
  on(UserActions.checkTokenSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),

  // SAVE USER SUCCESS
  on(UserActions.saveUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),

  // EDIT USER SUCCESS
  on(UserActions.editUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
//LOGOUT SUCCESS
on(UserActions.logoutSuccess, state => ({
  ...state,
  user: null,
  loading: false,
  error: null
})),

  // FAILURE
  on(
    UserActions.checkPhoneFailure,
    UserActions.checkEmailFailure,
    UserActions.checkTokenFailure,
    UserActions.saveUserFailure,
    UserActions.editUserFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),


  on(UserActions.clearUserError, state => ({
  ...state,
  error: null
}))

);
