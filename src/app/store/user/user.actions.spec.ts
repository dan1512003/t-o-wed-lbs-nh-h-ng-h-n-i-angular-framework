
import { checkPhone, checkPhoneFailure, checkPhoneSuccess } from './user.actions';

const mockCheckPhoneResponse = 

 
[
    {
        "email": "test@example.com",
        "phone": "0123456785"
    }
]
describe('User Actions', () => {

  it('should create check phone action with query', () => {
    const query = '0123456785';
    const action =checkPhone({phone:query})

    expect(action.type).toBe('[User] Check Phone');
    expect(action.phone).toBe(query);
  });

  it('should create checkphoneSuccess action with results mapped from mockSearchResponse', () => {
   

    const action = checkPhoneSuccess({ data:mockCheckPhoneResponse });

    expect(action.type).toBe('[User] Check Phone Success');
    expect(action.data.length).toBe(1);
    expect(action.data[0].phone).toBe('0123456785');
 
  });

  it('should create searchFailure action with error', () => {
    const error = { message: 'Something went wrong' };
    const action = checkPhoneFailure({ error:error.message });

    expect(action.type).toBe('[User] Check Phone Failure');
    expect(action.error).toEqual(error.message);
  });

});
