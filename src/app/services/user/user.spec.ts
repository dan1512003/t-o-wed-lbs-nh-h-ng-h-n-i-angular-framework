import { TestBed } from '@angular/core/testing';

import { User } from './user';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('User', () => {
  let service: User;
  let httpMock:HttpTestingController;
 const baseUrl = 'http://localhost:3000';
  const responsecheckphone=
  [
    {
        "email": "test@example.com",
        "phone": "0123456785"
    }
]
const responsecheckmail=
  {
    "user": {
        "email": "test@example.com",
        "phone": "0123456785",
        "image": null,
        "name": "luka luka"
    }
}

const responsechecktoken=
  {
    "email": "test@example.com",
    "phone": "0123456785",
    "image": null,
    "name": "luka luka"
}

const responsesaveuser=
  {
    "user": {
        "email": "test11@example.com",
        "phone": "0123456789",
        "image": null,
        "name": "Lu Bo"
    }
}

const responseedituser=
  {
    "user": {
        "email": "test11@example.com",
        "phone": "0987654321",
        "image": null,
        "name": "Lữ Bố"
    }
}

const responsegetuser=
  [
    {
        "email": "test@example.com",
        "name": "luka luka",
        "phone": "0123456785",
        "image": null
    }
]
  beforeEach(() => {
    TestBed.configureTestingModule({

       providers:[
        User,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(User);
    httpMock =TestBed.inject(HttpTestingController);
  });
afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // test service check phone
  it('should check phone', () => {
    service.checkPhone('0123456785').subscribe(res => {
      expect(res).toEqual(responsecheckphone);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/checkphone`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ phone: '0123456785' });
    expect(req.request.withCredentials).toBeTrue();

    req.flush(responsecheckphone);
  });

  // test service checkmail
  it('should check email', () => {
    service.checkEmail('test@example.com', '0123456785').subscribe(res => {
      expect(res).toEqual(responsecheckmail);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/checkmail`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'test@example.com',
      phone: '0123456785',
    });
   expect(req.request.withCredentials).toBeTrue();
    req.flush(responsecheckmail);
  });

  // test service checktoken
  it('should check token', () => {
    service.checkToken().subscribe(res => {
      expect(res).toEqual(responsechecktoken);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/checktoken`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    expect(req.request.withCredentials).toBeTrue();

    req.flush(responsechecktoken);
  });

  // check service saveuser
  it('should save user', () => {
    service
      .saveUser('test11@example.com', '0123456789', 'Bo', 'Lu')
      .subscribe(res => {
        expect(res).toEqual(responsesaveuser);
      });

    const req = httpMock.expectOne(`${baseUrl}/api/saveuser`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'test11@example.com',
      phone: '0123456789',
      lastname: 'Bo',
      firstname: 'Lu',
    });
    expect(req.request.withCredentials).toBeTrue();
    req.flush(responsesaveuser);
  });

  // test service edituser
  it('should edit user', () => {
    service
      .editUser('test11@example.com', '0987654321', 'Bố', 'Lữ')
      .subscribe(res => {
        expect(res).toEqual(responseedituser);
      });

    const req = httpMock.expectOne(`${baseUrl}/api/edituser`);
    expect(req.request.method).toBe('POST');
    expect(req.request.withCredentials).toBeTrue();
    req.flush(responseedituser);
  });

  // test service getuser
  it('should get user by email', () => {
    service.getUser('test@example.com').subscribe(res => {
      expect(res).toEqual(responsegetuser);
    });

    const req = httpMock.expectOne(
      `${baseUrl}/api/getuser?email=test@example.com`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeTrue();

    req.flush(responsegetuser);
  });
});
