import { TestBed } from '@angular/core/testing'; 
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Place } from './place';

describe('Place', () => {
  let service: Place;
  let httpMock: HttpTestingController;



 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Place,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(Place);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return place search results', () => {
    const query = 'Tokachiya Ramen';
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
    service.searchPlace(query).subscribe((res) => {
      
      expect(res).toEqual(mockSearchResponse);
      expect(res.features.length).toBe(1);
      expect(res.features[0].properties.name).toBe('Tokachiya Ramen');
    });

    const req = httpMock.expectOne(req =>
  req.url === 'http://localhost:3000/api/search' &&
  req.params.get('q') === 'Tokachiya Ramen'
);

    expect(req.request.method).toBe('GET');
    req.flush(mockSearchResponse);
  });

  it('should return address from lat/lon', () => {
    const lat = -34.4407231;
    const lon = -58.7051623;
 const mockLatLonResponse = {
    "place_id": 16021473,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    "osm_type": "way",
    "osm_id": 280940520,
    "lat": "-34.4407231",
    "lon": "-58.7051623",
    "category": "highway",
    "type": "motorway",
    "place_rank": 26,
    "importance": 0.05338152361333635,
    "addresstype": "road",
    "name": "Autopista Pedro Eugenio Aramburu",
    "display_name": "Autopista Pedro Eugenio Aramburu, El Triángulo, Partido de Malvinas Argentinas, Buenos Aires, B1619AGS, Argentina",
    "address": {
      "road": "Autopista Pedro Eugenio Aramburu",
      "village": "El Triángulo",
      "state_district": "Partido de Malvinas Argentinas",
      "state": "Buenos Aires",
      "ISO3166-2-lvl4": "AR-B",
      "postcode": "B1619AGS",
      "country": "Argentina",
      "country_code": "ar"
    },
    "boundingbox": ["-34.4415900","-34.4370994","-58.7086067","-58.7044712"]
  };
    service.getAddressFromLatLon(lat, lon).subscribe((res) => {
      expect(res).toBe("Autopista Pedro Eugenio Aramburu, El Triángulo, Partido de Malvinas Argentinas, Buenos Aires, B1619AGS, Argentina");
    });

    const req = httpMock.expectOne((request) => 
      request.url === 'http://localhost:3000/api/reverse' &&
      request.params.get('lat') === lat.toString() &&
      request.params.get('lon') === lon.toString() 
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockLatLonResponse);
  });

  it('should return default message if address not found', () => {
    const lat = 0;
    const lon = 0;
 const mockLatLonResponse = {}
    service.getAddressFromLatLon(lat, lon).subscribe((res) => {
      expect(res).toBe('Không tìm thấy địa chỉ');
    });

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:3000/api/reverse'
    );

    req.flush(mockLatLonResponse, { status: 200, statusText: 'OK' });
  });
});
