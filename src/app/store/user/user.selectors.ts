import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState =
  createFeatureSelector<UserState>('user');

export const selectUser =
  createSelector(selectUserState, s => s.user);

export const selectUserLoading =
  createSelector(selectUserState, s => s.loading);

  export const selectUserError =
  createSelector(selectUserState, s => s.error);

export const selectPhoneResult =
  createSelector(selectUserState, s => s.phoneResult);



