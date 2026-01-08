import { RestaurantModel } from './restaurant.model';

describe('Restaurant Model', () => {
  const mockApiResponse = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [105.8291428, 21.0625869]
        },
        properties: {
          full_id: 'n4164895890',
          osm_id: '4164895890',
          price: null,
          kids_area: null,
          baby_feeding: null,
          self_service: null,
          website_me: null,
          image: null,
          bar: null,
          indoor: null,
          contact_in: null,
          air_conditioning: null,
          outdoor: null,
          email: null,
          contact_fa: null,
          delivery: null,
          description: null,
          phone: '+84 246 292 1044',
          opening_hour: 'Mo-Su 08:00-24:00',
          cuisine: 'american;burger',
          website: 'https://www.chops.vn/',
          addr_street: 'Phố Quảng An',
          name: 'Chops',
          payment: null,
          diet: null,
          starttime: null
        }
      }
    ]
  };

  it('should create a Restaurant instance from feature', () => {
    const feature = mockApiResponse.features[0];
    const restaurant = RestaurantModel.fromFeature(feature);

    expect(restaurant).toBeTruthy();
    expect(restaurant.fullId).toBe('n4164895890');
    expect(restaurant.osmId).toBe('4164895890');
    expect(restaurant.name).toBe('Chops');
    expect(restaurant.phone).toBe('+84 246 292 1044');
    expect(restaurant.cuisine).toBe('american;burger');
    expect(restaurant.website).toBe('https://www.chops.vn/');
    expect(restaurant.lat).toBeCloseTo(21.0625869, 5);
    expect(restaurant.lon).toBeCloseTo(105.8291428, 5);

    // Check default ratings
    expect(restaurant.overallRating).toBe(0);
    expect(restaurant.ratefood).toBe(0);
    expect(restaurant.rateservice).toBe(0);
    expect(restaurant.rateambience).toBe(0);
    expect(restaurant.reviewCount).toBe(0);
  });

  it('should handle missing properties gracefully', () => {
    const featureMissing: any = {
      type: 'Feature',
      geometry: {},
      properties: {}
    };
    const restaurant = RestaurantModel.fromFeature(featureMissing);

    expect(restaurant.fullId).toBe('');
    expect(restaurant.osmId).toBe('');
    expect(restaurant.name).toBe('');
    expect(restaurant.phone).toBe('');
    expect(restaurant.lat).toBe(0);
    expect(restaurant.lon).toBe(0);
  });
});
