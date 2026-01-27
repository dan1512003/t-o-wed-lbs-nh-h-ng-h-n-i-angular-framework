import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from '../../services/user/user';
import { UserModel } from '../../model/user/user.model';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: User
  ) {}

  // effect checkphone
  checkPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkPhone),
      switchMap(({ phone }) =>
        this.userService.checkPhone(phone).pipe(
          map(data => UserActions.checkPhoneSuccess({ data })),
            catchError((error:Error) =>
                      of(UserActions.checkPhoneFailure({ error:error.message }))
                    )
        )
      )
    )
  );

  //effect checkmail
  checkEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkEmail),
      switchMap(({ email, phone }) =>
        this.userService.checkEmail(email, phone ?? '').pipe(
          map(res =>

            UserActions.checkEmailSuccess({  user: res?.user ? UserModel.fromJson(res.user) : null })
          ),
          catchError((error:Error) => of(UserActions.checkEmailFailure({error:error.message})))
        )
      )
    )
  );

  //effect checktoken
  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkToken),
      switchMap(() =>
        this.userService.checkToken().pipe(
         map(res => {
  console.log(' checkToken API response:', res);
  return UserActions.checkTokenSuccess({
    user: res ? UserModel.fromJson(res) : null
  });
}),
          catchError((error:Error) => of(UserActions.checkTokenFailure({error:error.message})))
        )
      )
    )
  );

  //effect saveuser
  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.saveUser),
      switchMap(payload =>
        this.userService
          .saveUser(
            payload.email,
            payload.phone,
            payload.lastname,
            payload.firstname
          )
          .pipe(
            map(res =>
              UserActions.saveUserSuccess({  user: res?.user ? UserModel.fromJson(res.user) : null })
            ),
            catchError((error:Error) => of(UserActions.saveUserFailure({error:error.message})))
          )
      )
    )
  );

  //effect edituser
editUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.editUser),
    switchMap(payload =>
      this.userService
        .editUser(
          payload.email,
          payload.phone,
          payload.lastname,
          payload.firstname,
          payload.oldemail
        )
        .pipe(
          switchMap(res => {
       
            if (!res || !res.user) {
              return of(
                UserActions.editUserFailure({
                  error: 'Edit user failure because email valid'
                })
              );
            }

          
            return of(
              UserActions.editUserSuccess({
                user: UserModel.fromJson(res.user)
              })
            );
          }),
          catchError((error: Error) =>
            of(UserActions.editUserFailure({ error: error.message }))
          )
        )
    )
  )
);



  //effect logout
  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.logout),
    switchMap(() =>
      this.userService.logout().pipe(
        map(() =>
          UserActions.logoutSuccess({ user: null })
        ),
        catchError((error: Error) =>
          of(UserActions.logoutFailure({ error: error.message }))
        )
      )
    )
  )
);

}
