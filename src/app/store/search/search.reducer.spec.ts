import { searchReducer, initialState, SearchState } from './search.reducer';
import * as SearchActions from './search.actions';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';

describe('SearchReducer', () => {



  it('should set loading true and error null on search action', () => {
    const action = SearchActions.search({ query: 'Hanoi' });
    const state = searchReducer(initialState, action);
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
    expect(state.results).toEqual([]);
  });

  it('should set results and loading false on searchSuccess', () => {
    const mockResults: NominatimPlace[] = [
      NominatimPlace.fromJson({
    "type": "FeatureCollection",
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "place_id": 220657157,
          "osm_type": "node",
          "osm_id": 10103088449,
          "place_rank": 30,
          "category": "amenity",
          "type": "restaurant",
          "importance": 7.283054856179167e-05,
          "addresstype": "amenity",
          "name": "Tokachiya Ramen",
          "display_name": "Tokachiya Ramen, 647B, Phố Kim Mã, Ngọc Khánh, Phường Giảng Võ, Hà Nội, 11110, Việt Nam",
          "address": {
            "amenity": "Tokachiya Ramen",
            "house_number": "647B",
            "road": "Phố Kim Mã",
            "neighbourhood": "Ngọc Khánh",
            "city_district": "Phường Giảng Võ",
            "city": "Hà Nội",
            "ISO3166-2-lvl4": "VN-HN",
            "postcode": "11110",
            "country": "Việt Nam",
            "country_code": "vn"
          }
        },
        "bbox": [105.8069328, 21.0290669, 105.8070328, 21.0291669],
        "geometry": { "type": "Point", "coordinates": [105.8069828, 21.0291169] }
      }
    ]
  })
    ];

    const action = SearchActions.searchSuccess({ results: mockResults });
    const state = searchReducer(initialState, action);

    expect(state.results).toEqual(mockResults);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should set error and reset results on searchFailure', () => {
    const action = SearchActions.searchFailure({ error: 'API Error' });
    const state = searchReducer(initialState, action);

    expect(state.error).toBe('API Error');
    expect(state.results).toEqual([]);
    expect(state.loading).toBeFalse();
  });

 
});
