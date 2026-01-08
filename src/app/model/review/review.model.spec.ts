import { ReviewModel } from './review.model';

describe('Review', () => {
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

  it('should create a Review instance from JSON', () => {
    const json = datareview[0];
    const review = ReviewModel.fromJson(json);

    expect(review).toBeInstanceOf(ReviewModel);
    expect(review.id).toBe(1);
    expect(review.ratefood).toBe(3);
    expect(review.rateservice).toBe(3);
    expect(review.rateambience).toBe(3);
    expect(review.overallrating).toBe(3);
    expect(review.command).toBe('good');
    expect(review.idRestaurant).toBe('12230186584');
    expect(review.email).toBe('test@example.com');
    expect(review.date).toBe('01/12/2025 15:30:45');
    expect(review.like).toBe('');
  });

  it('should convert a Review instance to JSON', () => {
    const json = datareview[1];
    const review = ReviewModel.fromJson(json);
    const output = review.toJson();

    expect(output).toEqual({
      id: 2,
      ratefood: 4,
      rateservice: 4,
      rateambience: 3,
      overallrating: 3,
      command: 'good food',
      id_restaurant: '12372330757',
      email: 'test@example.com',
      date: '02/12/2025 15:30:45',
      like: '',
    });
  });

  it('should handle missing or null values', () => {
    const review = ReviewModel.fromJson({});
    expect(review.id).toBe(0);
    expect(review.ratefood).toBe(0);
    expect(review.rateservice).toBe(0);
    expect(review.rateambience).toBe(0);
    expect(review.overallrating).toBe(0);
    expect(review.command).toBe('');
    expect(review.idRestaurant).toBe('');
    expect(review.email).toBe('');
    expect(review.date).toBe('');
    expect(review.like).toBe('');
  });

  it('should correctly map an array of reviews', () => {
    const reviews = datareview.map(r => ReviewModel.fromJson(r));
    expect(reviews.length).toBe(3);
    expect(reviews[2].command).toBe('bad');
    expect(reviews[2].idRestaurant).toBe('4090309926');
  });
});
