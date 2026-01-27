import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestScheduler } from 'rxjs/testing';
import { Action } from '@ngrx/store';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';
import { UserEffects } from './user.effects';
import { User } from '../../services/user/user';
import { checkEmail, checkEmailFailure, checkEmailSuccess, checkPhone, checkPhoneFailure, checkPhoneSuccess, checkToken, checkTokenFailure, checkTokenSuccess, editUser, editUserFailure, editUserSuccess, saveUser, saveUserFailure, saveUserSuccess } from './user.actions';
import { UserModel } from '../../model/user/user.model';



describe('ShowsEffects', () => {

  let effects: UserEffects;
 let actions = new Observable<Action>();
const userSpy = jasmine.createSpyObj('User', [
  'checkPhone',
  'checkEmail',
  'checkToken',
  'saveUser',
  'editUser'

]);
  let testScheduler: TestScheduler;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
       UserEffects,
        provideMockActions(() => actions),
        { provide: User, useValue: userSpy },
   
      ]
    });

    effects = TestBed.inject(UserEffects);


    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  //test checkphone$
describe('checkPhone$ ', () => {


  const mockresponsecheckphone=
   
  [
    {
        "email": "test@example.com",
        "phone": "0123456785"
    }
]
    it('should dispatch checkPhoneSuccess with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: checkPhone({ phone: '0123456785' })});

        const userResponse = cold('--x|', { x: mockresponsecheckphone });


      userSpy.checkPhone.and.returnValue(userResponse);


        const expectedResults =mockresponsecheckphone;

        expectObservable(effects.checkPhone$).toBe('---b', {
          b: checkPhoneSuccess({  data:expectedResults })
        });
      });
    });


    it('should dispatch checkPhoneFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
         actions = hot('-a', { a: checkPhone({ phone: '0123456785' })})

       
        const userResponse = cold('--#|', {}, new Error('API error'));
      userSpy.checkPhone.and.returnValue(userResponse);

      

        expectObservable(effects.checkPhone$).toBe('---b', {
          b: checkPhoneFailure({ error: 'API error' })
        });
      });
    });

  });


    //test effect checkEmail$
describe('checkEmail$ ', () => {


  const mockresponsecheckemail=
   
  {
    "user": {
        "email": "test@example.com",
        "phone": "0123456785",
        "image": null,
        "name": "luka luka"
    }
}
    it('should dispatch checkEmailSuccess with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: checkEmail({ email: 'test@example.com' })});

        const userResponse = cold('--x|', { x: mockresponsecheckemail});


      userSpy.checkEmail.and.returnValue(userResponse);


        const expectedResults = UserModel.fromJson(mockresponsecheckemail.user)

        expectObservable(effects.checkEmail$).toBe('---b', {
          b: checkEmailSuccess({  user:expectedResults })
        });
      });
    });


    it('should dispatch checkEmailFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
           actions = hot('-a', { a: checkEmail({ email: 'test@example.com' })});

       
        const userResponse = cold('--#|', {}, new Error('API error'));
     userSpy.checkEmail.and.returnValue(userResponse);

      

        expectObservable(effects.checkEmail$).toBe('---b', {
          b: checkEmailFailure({ error: 'API error' })
        });
      });
    });

  });

  //test effect  checkToken$
describe(' checkToken$ ', () => {


  const mockresponsechecktoken=
   
  {
    "email": "test@example.com",
    "phone": "0123456785",
    "image": null,
    "name": "luka luka"
}
    it('should dispatch checkTokenSuccess with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: checkToken()});

        const userResponse = cold('--x|', { x: mockresponsechecktoken});


      userSpy.checkToken.and.returnValue(userResponse);


        const expectedResults = UserModel.fromJson(mockresponsechecktoken)

        expectObservable(effects.checkToken$).toBe('---b', {
          b: checkTokenSuccess({  user:expectedResults })
        });
      });
    });


    it('should dispatch checkTokenFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
      actions = hot('-a', { a: checkToken()});

       
        const userResponse = cold('--#|', {}, new Error('API error'));
   userSpy.checkToken.and.returnValue(userResponse);

      

        expectObservable(effects.checkToken$).toBe('---b', {
          b: checkTokenFailure({ error: 'API error' })
        });
      });
    });

  });


  //test effect saveUser$
describe('saveUser$ ', () => {


  const mockresponsesaveuser=
   
  {
    "user": {
        "email": "test11@example.com",
        "phone": "0123456789",
        "image": null,
        "name": "Lu Bo"
    }
}
    it('should dispatch saveUserSuccess with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: saveUser({ 
          email:"test11@example.com",phone:"0123456789",lastname:"Bo" ,firstname:"Lu"})});

        const userResponse = cold('--x|', { x: mockresponsesaveuser});


      userSpy.saveUser.and.returnValue(userResponse);


        const expectedResults = UserModel.fromJson(mockresponsesaveuser.user)

        expectObservable(effects.saveUser$).toBe('---b', {
          b: saveUserSuccess({  user:expectedResults })
        });
      });
    });


    it('should dispatch saveUserFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
          actions = hot('-a', { a: saveUser({ 
          email:"test11@example.com",phone:"0123456789",lastname:"Bo" ,firstname:"Lu"})});

       
        const userResponse = cold('--#|', {}, new Error('API error'));
     userSpy.saveUser.and.returnValue(userResponse);

      

        expectObservable(effects.saveUser$).toBe('---b', {
          b: saveUserFailure({ error: 'API error' })
        });
      });
    });

  });


  //test effect editUser$
describe('editUser$', () => {


  const mockresponseedituser=
   
  {
    "user": {
        "email": "test11@example.com",
        "phone": "0987654321",
        "image": null,
        "name": "Lu Bo"
    }
}
    it('should dispatch editUserSuccess with results when query is valid', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot('-a', { a: editUser({ 
          email:"test11@example.com",phone:"0987654321",lastname:"Bo" ,firstname:"Lu",oldemail:"test11@example.com"})});

        const userResponse = cold('--x|', { x: mockresponseedituser});


      userSpy.editUser.and.returnValue(userResponse);


        const expectedResults = UserModel.fromJson(mockresponseedituser.user)

        expectObservable(effects.editUser$).toBe('---b', {
          b: editUserSuccess({  user:expectedResults })
        });
      });
    });


    it('should dispatch editUserFailure when any service errors', () => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
         actions = hot('-a', { a: editUser({ 
   email:"test11@example.com",phone:"0987654321",lastname:"Bo" ,firstname:"Lu",oldemail:"test11@example.com"})});

       
        const userResponse = cold('--#|', {}, new Error('API error'));
       userSpy.editUser.and.returnValue(userResponse);

      

        expectObservable(effects.editUser$).toBe('---b', {
          b: editUserFailure({ error: 'API error' })
        });
      });
    });

  });
});
