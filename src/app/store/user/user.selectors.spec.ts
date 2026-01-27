import { selectPhoneResult, selectUser, selectUserLoading } from "./user.selectors";



describe('User Selectors', () => {

  const initialRestaurantWardState: any = {
  user: null,
  loading: true,
  phoneResult: [],
  error: null,
  };

  // restaurantward selectors
  it('should selectPhoneResult ', () => {
    expect(selectPhoneResult.projector(initialRestaurantWardState)).toEqual([]);
  });

  it('should selectUserLoading', () => {
    expect(selectUserLoading.projector(initialRestaurantWardState)).toBeTrue();
  });

  it('should selectUser ', () => {
    expect(selectUser.projector(initialRestaurantWardState)).toBeNull();
  });

 

});
