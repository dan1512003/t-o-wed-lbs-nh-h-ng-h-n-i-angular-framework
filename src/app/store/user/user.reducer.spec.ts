
import { checkPhone, checkPhoneFailure, checkPhoneSuccess } from './user.actions';
import { initialState, userReducer } from './user.reducer';

describe('UserReducer', () => {



  it('should set loading true and error null on checkphone action', () => {
    const action = checkPhone({ phone: '0123456789' });
    const state = userReducer(initialState, action);
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should set results and loading false on checkphoneSuccess', () => {
   const mockCheckPhoneResponse = 

 
[
    {
        "email": "test@example.com",
        "phone": "0123456785"
    }
]

    const action =checkPhoneSuccess({ data:mockCheckPhoneResponse });
    const state = userReducer(initialState, action);

    expect(state.phoneResult).toEqual(mockCheckPhoneResponse);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should set error and reset results on checkphoneFailure', () => {
    const action = checkPhoneFailure({ error: 'API Error' });
    const state = userReducer(initialState, action);

    expect(state.error).toBe('API Error');
    expect(state.loading).toBeFalse();
  });

 
});