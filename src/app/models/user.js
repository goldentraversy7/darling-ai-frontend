export class GBUser {
  constructor(
    id,
    {
      displayName,
      username,
      email,
      phone,
      gender,
      birthday,
      locale,
      photo,
      imageUrl,
      platform,
      provider,
      linkedProviders,
      favoriteProviders,
      interestGenres,
      featured,
    }
  ) {
    this.id = id;
    this.displayName = displayName;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.gender = gender;
    if (birthday) {
      this.birthday = new Date(birthday);
    }
    this.locale = locale;
    if (photo) {
      this.photo = photo;
    } else if (imageUrl) {
      this.photo = {
        url: imageUrl,
      };
    }
    this.platform = platform;
    this.provider = provider;
    this.linkedProviders = linkedProviders;
    this.favoriteProviders = favoriteProviders;
    this.interestGenres = interestGenres;
    this.featured = featured;
  }
}

// Firestore data converter
export const userConverter = {
  toFirestore: (user) => {
    return {
      displayName: user.displayName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      birthday: user.birthday?.getTime(),
      locale: user.locale,
      photo: user.photo,
      platform: user.platform,
      provider: user.provider,
      linkedProviders: user.linkedProviders,
      favoriteProviders: user.favoriteProviders,
      interestGenres: user.interestGenres,
      featured: user.featured,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new GBUser(snapshot.id, data);
  },
};
