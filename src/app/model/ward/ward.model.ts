export class WardModel {
  fullId: string;
  osmId: string;
  name: string;
  nameEn: string;
  image: string;

  constructor(init: {
    fullId: string;
    osmId: string;
    name: string;
    nameEn: string;
    image: string;
  }) {
    this.fullId = init.fullId;
    this.osmId = init.osmId;
    this.name = init.name;
    this.nameEn = init.nameEn;
    this.image = init.image;
  }


  static fromMap(map: any): WardModel {
    return new WardModel({
      fullId: map['full_id'] ?? '',
      osmId: map['osm_id'] ?? '',
      name: map['name'] ?? '',
      nameEn: map['name_en'] ?? '',
      image: map['image'] ?? ''
    });
  }

  
}
