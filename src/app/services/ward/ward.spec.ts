import { TestBed } from '@angular/core/testing';

import { Ward } from './ward';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Ward', () => {
  let service: Ward;
  let httpMock:HttpTestingController;
  
  const baseUrl = 'http://localhost:3000';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        Ward,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(Ward);
    httpMock =TestBed.inject(HttpTestingController);
  });
afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

it('should get ward list', () => {

  
   const mockWardResponse = {
            "type": "FeatureCollection",
            "features":
            [ {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            
                              
                        ]
                    },
                    "properties": {
                        "full_id": "r19338089",
                        "osm_id": "19338089",
                        "name": "Xã Trung Giã",
                        "name_en": "Trung Gia Commune",
                        "image": "https://resource.kinhtedothi.vn/resources2025/1/users/49/soc-son-3-1755610860.jpeg"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            
                              
                        ]
                    },
                    "properties": {
                        "full_id": "r19338090",
                        "osm_id": "19338090",
                        "name": "Xã Kim Anh",
                        "name_en": "Kim Anh Commune",
                        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREnTUJmur1TSqOxK8_KG86dgOq51dtQYX6TQ&s"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                           
                        ]
                    },
                    "properties": {
                        "full_id": "r19331655",
                        "osm_id": "19331655",
                        "name": "Phường Văn Miếu - Quốc Tử Giám",
                        "name_en": "Van Mieu - Quoc Tu Giam Ward",
                        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ429EbnsvQbEOuhzXAxLc3a5x4FUYLt4ZVBQ&s"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                          
                        ]
                    },
                    "properties": {
                        "full_id": "r19331657",
                        "osm_id": "19331657",
                        "name": "Phường Bạch Mai",
                        "name_en": "Bach Mai Ward",
                        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-pppBaOVZnkQxtVgwt0v5Jm8ju2QYE3iSUw&s"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            
                               
                        ]
                    },
                    "properties": {
                        "full_id": "r19331658",
                        "osm_id": "19331658",
                        "name": "Phường Ô Chợ Dừa",
                        "name_en": "O Cho Dua Ward",
                        "image": "https://global-uploads.webflow.com/60af8c708c6f35480d067652/6184d591a39ff12e498c701c_ubnd-o-cho-dua.png"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            
                        ]
                    },
                    "properties": {
                        "full_id": "r19331659",
                        "osm_id": "19331659",
                        "name": "Phường Đống Đa",
                        "name_en": "Dong Da Ward",
                        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmDA5B8l9IfTKw2SsiRmLCcF9aCqU7LobxnA&s"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                           
                        ]
                    },
                    "properties": {
                        "full_id": "r19332318",
                        "osm_id": "19332318",
                        "name": "Phường Láng",
                        "name_en": "Lang Ward",
                        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPXLMMoiDD75C4jDg_aroq-tN5VK0tK73LWw&s"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                          
                        ]
                    },
                    "properties": {
                        "full_id": "r19332319",
                        "osm_id": "19332319",
                        "name": "Phường Giảng Võ",
                        "name_en": "Giang Vo Ward",
                        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShibnD4Ec6IPX3jth49d4s_hDVWguNJ0NmvQ&s"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                          
                        ]
                    },
                    "properties": {
                        "full_id": "r19301119",
                        "osm_id": "19301119",
                        "name": "Phường Long Biên",
                        "name_en": "Long Bien Ward",
                        "image": "https://cdn.xanhsm.com/2024/11/fd021095-cau-long-bien-3.jpg"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                          
                        ]
                    },
                    "properties": {
                        "full_id": "r19411387",
                        "osm_id": "19411387",
                        "name": "Xã Ứng Hòa",
                        "name_en": "Ứng Hòa Commune",
                        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwdoNcQO7uDeQs7OwfmikgiAPXg_LGCJyWA&s"
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                           
                        ]
                    },
                    "properties": {
                        "full_id": "r19334585",
                        "osm_id": "19334585",
                        "name": "Phường Phương Liệt",
                        "name_en": "Phuong Liet Ward",
                        "image": "https://meetup.vn/wp-content/uploads/2025/07/phuong-phuong-liet-ha-noi-68683b.jpg"
                    }
                },
                ]
        }
    service.getWard().subscribe((res) => {
      expect(res).toEqual(mockWardResponse);
      expect(res.type).toBe('FeatureCollection');
      expect(res.features.length).toBeGreaterThan(0);
      expect(res.features[0].geometry.type).toBe("MultiPolygon");
      expect(res.features[0].properties.osm_id).toBe("19338089");
    });

    const req = httpMock.expectOne(`${baseUrl}/api/ward`);
    expect(req.request.method).toBe('GET');

    req.flush(mockWardResponse);
  });

 
  it('should get ward by osm_id', () => {
    const osmId = 19331651;
    const mockWardResponse = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                          
                        ]
                    },
                    "properties": {
                        "full_id": "r19331651",
                        "osm_id": "19331651",
                        "name": "Phường Hoàn Kiếm",
                        "name_en": "Hoan Kiem Ward",
                        "image": "https://lirp.cdn-website.com/9c039c04/dms3rep/multi/opt/ho-hoan-kiem-2-640w.jpg"
                    }
                }
            ]
        }
    service.getWardById(osmId).subscribe((res) => {
      expect(res).toEqual(mockWardResponse);
      expect(res.type).toBe('FeatureCollection');
      expect(res.features.length).toBeGreaterThan(0);
      expect(res.features[0].geometry.type).toBe("MultiPolygon");
      expect(res.features[0].properties.osm_id).toBe("19331651");
    });

    const req = httpMock.expectOne((request) =>
      request.url === `${baseUrl}/api/ward` &&
      request.params.get('osm_id') === osmId.toString()
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockWardResponse);
  });


  it('should get ward by lat lon', () => {
    const lat = 21.0285;
    const lon = 105.8542;
    const mockWardResponse= {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                          
                        ]
                    },
                    "properties": {
                        "full_id": "r19331651",
                        "osm_id": "19331651",
                        "name": "Phường Hoàn Kiếm",
                        "name_en": "Hoan Kiem Ward"
                    }
                }
            ]
        }
    service.getWardByLatLon(lat, lon).subscribe((res) => {
      expect(res).toEqual(mockWardResponse);
      expect(res.type).toBe('FeatureCollection');
      expect(res.features.length).toBeGreaterThan(0);
      expect(res.features[0].geometry.type).toBe("MultiPolygon");
      expect(res.features[0].properties.osm_id).toBe("19331651");
    });

    const req = httpMock.expectOne((request) =>
      request.url === `${baseUrl}/api/wardlatlon` &&
      request.params.get('lat') === lat.toString() &&
      request.params.get('lon') === lon.toString()
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockWardResponse);
  });

});
