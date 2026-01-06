class User {
  constructor({ email, phone, image = null, name = null }) {
    this.email = email ?? '';
    this.phone = phone ?? '';
    this.image = image;
    this.name = name;
  }

  static fromJson(json = {}) {
    return new User({
      email: json.email?.toString() ?? '',
      phone: json.phone?.toString() ?? '',
      image: json.image?.toString() ?? null,
      name: json.name?.toString() ?? null,
    });
  }

  toJson() {
    return {
      email: this.email,
      phone: this.phone,
      image: this.image,
      name: this.name,
    };
  }
}

module.exports = User;
