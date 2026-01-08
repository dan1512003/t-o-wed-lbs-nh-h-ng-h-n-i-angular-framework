export class ReviewModel {
  id: number;
  ratefood: number;
  rateservice: number;
  rateambience: number;
  overallrating: number;
  command: string;
  idRestaurant: string;
  email: string;
  date: string;
  like: string;

  constructor(init: {
    id: number;
    ratefood?: number;
    rateservice?: number;
    rateambience?: number;
    overallrating?: number;
    command?: string;
    idRestaurant?: string;
    email?: string;
    date?: string;
    like?: string;
  }) {
    this.id = init.id ?? 0;
    this.ratefood = init.ratefood ?? 0;
    this.rateservice = init.rateservice ?? 0;
    this.rateambience = init.rateambience ?? 0;
    this.overallrating = init.overallrating ?? 0;
    this.command = init.command ?? '';
    this.idRestaurant = init.idRestaurant ?? '';
    this.email = init.email ?? '';
    this.date = init.date ?? '';
    this.like = init.like ?? '';
  }


  static fromJson(json: any): ReviewModel {
    return new ReviewModel({
      id: json['id'] ?? 0,
      ratefood: json['ratefood'] ?? 0,
      rateservice: json['rateservice'] ?? 0,
      rateambience: json['rateambience'] ?? 0,
      overallrating: json['overallrating'] ?? 0,
      command: json['command'] ?? '',
      idRestaurant: json['id_restaurant'] ?? '',
      email: json['email'] ?? '',
      date: json['date'] ?? '',
      like: json['like'] ?? ''
    });
  }

  toJson(): any {
    return {
      id: this.id,
      ratefood: this.ratefood,
      rateservice: this.rateservice,
      rateambience: this.rateambience,
      overallrating: this.overallrating,
      command: this.command,
      id_restaurant: this.idRestaurant,
      email: this.email,
      date: this.date,
      like: this.like
    };
  }
}
