export class User {
  email: string;
  phone: string;
  image?: string | null;
  name?: string | null;

  constructor(data?: Partial<User>) {
    this.email = data?.email ?? '';
    this.phone = data?.phone ?? '';
    this.image = data?.image ?? null;
    this.name = data?.name ?? null;
  }


  static fromJson(json: any): User {
    return new User({
      email: json?.email?.toString() ?? '',
      phone: json?.phone?.toString() ?? '',
      image: json?.image?.toString() ?? null,
      name: json?.name?.toString() ?? null,
    });
  }


  toJson(): any {
    return {
      email: this.email,
      phone: this.phone,
      image: this.image,
      name: this.name,
    };
  }



  get firstName(): string {
    if (!this.name || !this.name.trim()) return '';
    return this.name.trim().split(' ')[0];
  }

  get lastName(): string {
    if (!this.name || !this.name.trim()) return '';
    const parts = this.name.trim().split(' ');
    if (parts.length <= 1) return '';
    return parts.slice(1).join(' ');
  }
}
