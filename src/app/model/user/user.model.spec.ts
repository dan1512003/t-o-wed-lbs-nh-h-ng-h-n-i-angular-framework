import { UserModel } from "./user.model";


describe('User Model', () => {

  const mockApiResponse = {
    user: {
      email: 'test@example.com',
      phone: '0123456785',
      image: null,
      name: 'luka luka'
    }
  };

  it('should create an instance from constructor', () => {
    const user = new UserModel({
      email: 'test@example.com',
      phone: '0123456785',
      image: null,
      name: 'luka luka'
    });

    expect(user).toBeTruthy();
    expect(user.email).toBe('test@example.com');
  });

  it('should create User from JSON', () => {
    const user = UserModel.fromJson(mockApiResponse.user);

    expect(user).toBeTruthy();
    expect(user.email).toBe('test@example.com');
    expect(user.phone).toBe('0123456785');
    expect(user.image).toBeNull();
    expect(user.name).toBe('luka luka');
  });

  it('should return correct firstName', () => {
    const user = UserModel.fromJson(mockApiResponse.user);
    expect(user.firstName).toBe('luka');
  });

  it('should return correct lastName', () => {
    const user = UserModel.fromJson(mockApiResponse.user);
    expect(user.lastName).toBe('luka');
  });

  it('should convert User to JSON', () => {
    const user = UserModel.fromJson(mockApiResponse.user);

    const json = user.toJson();

    expect(json).toEqual({
      email: 'test@example.com',
      phone: '0123456785',
      image: null,
      name: 'luka luka'
    });
  });

});
