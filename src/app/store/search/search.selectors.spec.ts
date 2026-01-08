import * as SearchSelectors from './search.selectors';
import { SearchState } from './search.reducer';
import { NominatimPlace } from '../../model/nominatimplace/nominatimplace.model';

describe('SearchSelectors with mockSearchResponse', () => {

  const mockSearchResponse = {
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
  };

  // Chuyển mockSearchResponse sang NominatimPlace[]
  const mockResults: NominatimPlace[] = mockSearchResponse.features.map(f => NominatimPlace.fromJson(f));

  const initialState: { search: SearchState } = {
    search: {
      results: mockResults,
      loading: true,
      error: null
    }
  };

  it('should select the search state', () => {
    const result = SearchSelectors.selectSearchState.projector(initialState.search);
    expect(result).toEqual(initialState.search);
  });

  it('should select results', () => {
    const result = SearchSelectors.selectResults.projector(initialState.search);
    expect(result).toEqual(mockResults);
  });

  it('should select loading', () => {
    const result = SearchSelectors.selectLoading.projector(initialState.search);
    expect(result).toBeTrue();
  });

  it('should select error', () => {
    const result = SearchSelectors.selectError.projector(initialState.search);
    expect(result).toBeNull();
  });

});
