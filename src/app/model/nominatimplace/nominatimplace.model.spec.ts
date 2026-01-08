import { NominatimPlace } from './nominatimplace.model';

describe('NominatimPlace Model', () => {
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

  it('should create a NominatimPlace instance from feature', () => {
    const feature = mockSearchResponse.features[0];
    const place = NominatimPlace.fromJson(feature);

    expect(place).toBeTruthy();
    expect(place.displayName).toBe("Tokachiya Ramen, 647B, Phố Kim Mã, Ngọc Khánh, Phường Giảng Võ, Hà Nội, 11110, Việt Nam");
    expect(place.name).toBe("Tokachiya Ramen");
    expect(place.osmId).toBe("10103088449");
    expect(place.category).toBe("amenity");
    expect(place.lat).toBeCloseTo(21.0291169, 5);
    expect(place.lon).toBeCloseTo(105.8069828, 5);
  });

  it('should handle missing geometry and properties gracefully', () => {
    const featureMissing: any = {
      type: "Feature",
      geometry: null,
      properties: null
    };
    const place = NominatimPlace.fromJson(featureMissing);

    expect(place.displayName).toBe('');
    expect(place.name).toBe('');
    expect(place.osmId).toBe('');
    expect(place.category).toBe('');
    expect(place.lat).toBe(0);
    expect(place.lon).toBe(0);
  });
});
