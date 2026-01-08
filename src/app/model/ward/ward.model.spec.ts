import { WardModel } from './ward.model';

describe('WardModel', () => {
  const mockWardResponse = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: []
        },
        properties: {
          full_id: "r19331651",
          osm_id: "19331651",
          name: "Phường Hoàn Kiếm",
          name_en: "Hoan Kiem Ward",
          image: "https://lirp.cdn-website.com/9c039c04/dms3rep/multi/opt/ho-hoan-kiem-2-640w.jpg"
        }
      }
    ]
  };

  it('should create a Ward instance from map', () => {
    const featureProperties = mockWardResponse.features[0].properties;
    const ward = WardModel.fromMap(featureProperties);

    expect(ward).toBeInstanceOf(WardModel);
    expect(ward.fullId).toBe('r19331651');
    expect(ward.osmId).toBe('19331651');
    expect(ward.name).toBe('Phường Hoàn Kiếm');
    expect(ward.nameEn).toBe('Hoan Kiem Ward');
    expect(ward.image).toBe('https://lirp.cdn-website.com/9c039c04/dms3rep/multi/opt/ho-hoan-kiem-2-640w.jpg');
  });

  it('should handle missing properties with empty string', () => {
    const ward = WardModel.fromMap({});
    expect(ward.fullId).toBe('');
    expect(ward.osmId).toBe('');
    expect(ward.name).toBe('');
    expect(ward.nameEn).toBe('');
    expect(ward.image).toBe('');
  });
});
