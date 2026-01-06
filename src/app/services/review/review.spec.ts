import { TestBed } from '@angular/core/testing';

import { Review } from './review';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Review', () => {
  let service: Review;
  let httpMock:HttpTestingController;
   const baseUrl = 'http://localhost:3000';

  const datareview = [
    {
      id: 1,
      ratefood: 3,
      rateservice: 3,
      rateambience: 3,
      overallrating: 3,
      command: 'good',
      id_restaurant: '12230186584',
      email: 'test@example.com',
      date: '01/12/2025 15:30:45',
      like: null,
    },
    {
      id: 2,
      ratefood: 4,
      rateservice: 4,
      rateambience: 3,
      overallrating: 3,
      command: 'good food',
      id_restaurant: '12372330757',
      email: 'test@example.com',
      date: '02/12/2025 15:30:45',
      like: null,
    },
    {
      id: 4,
      ratefood: 2,
      rateservice: 2,
      rateambience: 2,
      overallrating: 2,
      command: 'bad',
      id_restaurant: '4090309926',
      email: 'test1@example.com',
      date: '04/12/2025 15:30:45',
      like: null,
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        Review,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(Review);
    httpMock =TestBed.inject(HttpTestingController);
  });
afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('should get all reviews', () => {
    service.getReview().subscribe((res) => {
      expect(res.length).toBe(3);
      expect(res[0].id_restaurant).toBe('12230186584');
    });

    const req = httpMock.expectOne(`${baseUrl}/api/review`);
    expect(req.request.method).toBe('GET');
    req.flush(datareview);
  });

  it('should get review by osm_id', () => {
    const osmId = 4090309926;

    service.getReviewById(osmId).subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].email).toBe('test1@example.com');
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url === `${baseUrl}/api/review` &&
        request.params.get('osm_id') === osmId.toString()
    );
    expect(req.request.method).toBe('GET');
    req.flush(datareview.filter((r) => r.id_restaurant === osmId.toString()));
  });

  it('should get review by email', () => {
    const email = 'test@example.com';

    service.getReviewByEmail(email).subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res[0].id_restaurant).toBe('12230186584');
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url === `${baseUrl}/api/reviewemail` &&
        request.params.get('email') === email
    );
    expect(req.request.method).toBe('GET');
    req.flush(datareview.filter((r) => r.email === email));
  });

  it('should get review by email and osm_id', () => {
    const email = 'test@example.com';
    const osmId = 12372330757;

    service.getReviewByEmailAndOsmId(email, osmId).subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].command).toBe('good food');
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url === `${baseUrl}/api/reviewemail` &&
        request.params.get('email') === email &&
        request.params.get('osm_id') === osmId.toString()
    );
    expect(req.request.method).toBe('GET');
    req.flush(
      datareview.filter(
        (r) => r.email === email && r.id_restaurant === osmId.toString()
      )
    );
  });

  it('should add a new review', () => {
    const payload = {
      rateFood: 5,
      rateService: 5,
      rateAmbience: 5,
      overallRating: 5,
      command: 'Excellent',
      idRestaurant: '9999999999',
      email: 'new@test.com',
      date: '06/01/2026 12:00:00',
    };

    service.addReview(payload).subscribe((res) => {
      expect(res[datareview.length - 1].id_restaurant).toBe('9999999999');
      expect(res[datareview.length - 1].command).toBe('Excellent');
    });

    const req = httpMock.expectOne(`${baseUrl}/api/addreview`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

  const newId = datareview.length > 0 ? Math.max(...datareview.map(r => r.id)) + 1 : 1;
   const newReview = {
    "id": newId,
    "ratefood": payload.rateFood,
    "rateservice": payload.rateService,
    "rateambience": payload.rateAmbience,
    "overallrating": payload.overallRating,
    "command": payload.command,
    "id_restaurant": payload.idRestaurant,
    "email": payload.email,
    "date": payload.date,
    "like": null,
  };

 
  datareview.push(newReview);

 
  req.flush(datareview);
  });

  it('should edit an existing review', () => {
    const payload = {
      rateFood: 1,
      rateService: 1,
      rateAmbience: 1,
      overallRating: 1,
      command: 'Very bad',
      idRestaurant: '12230186584',
      email: 'test@example.com',
      date: '06/01/2026 13:00:00',
    };
const index = datareview.findIndex((review) =>
  review['email'] === payload.email && review['id_restaurant'] === payload.idRestaurant
);

    service.editReview(payload).subscribe((res) => {
      expect(res[index].command).toBe('Very bad');
      expect(res[index].ratefood).toBe(1);
    });

    const req = httpMock.expectOne(`${baseUrl}/api/editreview`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    const newId = datareview.length > 0 ? Math.max(...datareview.map(r => r.id)) + 1 : 1;
   const newReview = {
    "id": newId,
    "ratefood": payload.rateFood,
    "rateservice": payload.rateService,
    "rateambience": payload.rateAmbience,
    "overallrating": payload.overallRating,
    "command": payload.command,
    "id_restaurant": payload.idRestaurant,
    "email": payload.email,
    "date": payload.date,
    "like": null,
  };

 
  datareview[index]=newReview;

 
  req.flush(datareview);
  });
});
