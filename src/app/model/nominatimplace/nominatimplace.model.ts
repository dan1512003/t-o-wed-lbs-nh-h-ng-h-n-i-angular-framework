export class NominatimPlace {
   
  displayName: string;
  lat: number;
  lon: number;
  name: string;
  osmId: string;
  category: string;

  constructor(init: {
    displayName: string;
    lat: number;
    lon: number;
    name: string;
    osmId: string;
    category: string;
  }) {
    this.displayName = init.displayName;
    this.lat = init.lat;
    this.lon = init.lon;
    this.name = init.name;
    this.osmId = init.osmId;
    this.category = init.category;
  }

  // Factory method giống fromJson trong Dart
  static fromJson(feature: any): NominatimPlace {
    const properties = feature['properties'] ?? {};
    const geometry = feature['geometry'];
    const coordinates = geometry?.['coordinates'] ?? [];

    return new NominatimPlace({
      displayName: properties['display_name'] ?? '',
      name: properties['name'] ?? '',
      osmId: properties['osm_id']?.toString() ?? '',
      category: properties['category'] ?? '',
      lon: coordinates.length > 0 ? Number(coordinates[0]) : 0.0,
      lat: coordinates.length > 1 ? Number(coordinates[1]) : 0.0,
    });
  }


}
