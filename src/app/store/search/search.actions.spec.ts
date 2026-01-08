import * as SearchActions from './search.actions';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';

const mockSearchResponse = {
  type: "FeatureCollection",
  licence: "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
  features: [
    {
      type: "Feature",
      properties: {
        place_id: 220657157,
        osm_type: "node",
        osm_id: 10103088449,
        place_rank: 30,
        category: "amenity",
        type: "restaurant",
        name: "Tokachiya Ramen",
        display_name: "Tokachiya Ramen, 647B, Phố Kim Mã, Ngọc Khánh, Phường Giảng Võ, Hà Nội, 11110, Việt Nam",
      },
      geometry: { type: "Point", coordinates: [105.8069828, 21.0291169] }
    }
  ]
};

describe('Search Actions', () => {

  it('should create search action with query', () => {
    const query = 'Hoan Kiem';
    const action = SearchActions.search({ query });

    expect(action.type).toBe('[Search] Search');
    expect(action.query).toBe(query);
  });

  it('should create searchSuccess action with results mapped from mockSearchResponse', () => {
    const results: NominatimPlace[] = mockSearchResponse.features.map(f => NominatimPlace.fromJson(f));

    const action = SearchActions.searchSuccess({ results });

    expect(action.type).toBe('[Search] Search Success');
    expect(action.results.length).toBe(1);
    expect(action.results[0].name).toBe('Tokachiya Ramen');
    expect(action.results[0].osmId).toBe('10103088449');
    expect(action.results[0].category).toBe('amenity');
    expect(action.results[0].lat).toBeCloseTo(21.0291169);
    expect(action.results[0].lon).toBeCloseTo(105.8069828);
  });

  it('should create searchFailure action with error', () => {
    const error = { message: 'Something went wrong' };
    const action = SearchActions.searchFailure({ error });

    expect(action.type).toBe('[Search] Search Failure');
    expect(action.error).toEqual(error);
  });

});
