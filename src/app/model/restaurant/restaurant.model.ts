export class RestaurantModel {
   
  fullId: string;
  osmId: string;
  price: string;
  kidsArea: string;
  babyFeeding: string;
  selfService: string;
  websiteMe: string;
  image: string;
  bar: string;
  indoor: string;
  contactIn: string;
  airConditioning: string;
  outdoor: string;
  email: string;
  contactFa: string;
  delivery: string;
  description: string;
  phone: string;
  openingHour: string;
  cuisine: string;
  website: string;
  addrStreet: string;
  name: string;
  payment: string;
  diet: string;
  lat: number;
  lon: number;
  starttime?: string;

  // Rating defaults
  overallRating: number = 0;
  ratefood: number = 0;
  rateservice: number = 0;
  rateambience: number = 0;
  reviewCount: number = 0;

  constructor(init: {
    fullId: string;
    osmId: string;
    price: string;
    kidsArea: string;
    babyFeeding: string;
    selfService: string;
    websiteMe: string;
    image: string;
    bar: string;
    indoor: string;
    contactIn: string;
    airConditioning: string;
    outdoor: string;
    email: string;
    contactFa: string;
    delivery: string;
    description: string;
    phone: string;
    openingHour: string;
    cuisine: string;
    website: string;
    addrStreet: string;
    name: string;
    payment: string;
    diet: string;
    lat: number;
    lon: number;
    starttime?: string;
  }) {
    this.fullId = init.fullId;
    this.osmId = init.osmId;
    this.price = init.price;
    this.kidsArea = init.kidsArea;
    this.babyFeeding = init.babyFeeding;
    this.selfService = init.selfService;
    this.websiteMe = init.websiteMe;
    this.image = init.image;
    this.bar = init.bar;
    this.indoor = init.indoor;
    this.contactIn = init.contactIn;
    this.airConditioning = init.airConditioning;
    this.outdoor = init.outdoor;
    this.email = init.email;
    this.contactFa = init.contactFa;
    this.delivery = init.delivery;
    this.description = init.description;
    this.phone = init.phone;
    this.openingHour = init.openingHour;
    this.cuisine = init.cuisine;
    this.website = init.website;
    this.addrStreet = init.addrStreet;
    this.name = init.name;
    this.payment = init.payment;
    this.diet = init.diet;
    this.lat = init.lat;
    this.lon = init.lon;
    this.starttime = init.starttime;
  }

 
  static fromFeature(feature: any): RestaurantModel {
    const props = feature['properties'] ?? {};
    const geometry = feature['geometry'];
    const coordinates = geometry?.['coordinates'] ?? [];

    return new RestaurantModel({
      fullId: props['full_id'] ?? '',
      osmId: props['osm_id']?.toString() ?? '',
      price: props['price'] ?? '',
      kidsArea: props['kids_area'] ?? '',
      babyFeeding: props['baby_feeding'] ?? '',
      selfService: props['self_service'] ?? '',
      websiteMe: props['website_me'] ?? '',
      image: props['image'] ?? '',
      bar: props['bar'] ?? '',
      indoor: props['indoor'] ?? '',
      contactIn: props['contact_in'] ?? '',
      airConditioning: props['air_conditioning'] ?? '',
      outdoor: props['outdoor'] ?? '',
      email: props['email'] ?? '',
      contactFa: props['contact_fa'] ?? '',
      delivery: props['delivery'] ?? '',
      description: props['description'] ?? '',
      phone: props['phone'] ?? '',
      openingHour: props['opening_hour'] ?? '',
      cuisine: props['cuisine'] ?? '',
      website: props['website'] ?? '',
      addrStreet: props['addr_street'] ?? '',
      name: props['name'] ?? '',
      payment: props['payment'] ?? '',
      diet: props['diet'] ?? '',
      starttime: props['starttime'],
      lon: coordinates.length > 0 ? Number(coordinates[0]) : 0,
      lat: coordinates.length > 1 ? Number(coordinates[1]) : 0,
    });
  }


}
