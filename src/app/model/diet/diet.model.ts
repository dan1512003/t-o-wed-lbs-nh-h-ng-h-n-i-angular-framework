export class DietModel {
  id: number;
  diet: string;
  image: string;
  count: number;

  constructor(init: {
    id: number;
    diet: string;
    image: string;
    count?: number;
  }) {
    this.id = init.id;
    this.diet = init.diet;
    this.image = init.image;
    this.count = init.count ?? 0;
  }

  // Factory giống Dart fromJson
  static fromJson(json: any): DietModel {
    return new DietModel({
      id: json['id'],
      diet: json['diet'],
      image: json['image'],
      count: json['count'] ?? 0
    });
  }

  toJson(): any {
    return {
      id: this.id,
      diet: this.diet,
      image: this.image,
      count: this.count
    };
  }
}
