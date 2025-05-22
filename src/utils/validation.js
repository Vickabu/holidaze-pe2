// utils/validation.js

// Epost for Noroff og stud.noroff (krever @noroff.no eller @stud.noroff.no)
export function validateNoroffEmail(email) {
  const re = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  return re.test(email);
}

// Passord minimum 8 tegn
export function validatePassword(password) {
  return typeof password === "string" && password.length >= 8;
}

// Navn: kun alfanumeriske tegn, maks 20 tegn
export function validateName(name) {
  const re = /^[\w]+$/;
  return typeof name === "string" && re.test(name) && name.length <= 20;
}

// Bio: maks 160 tegn, kan være tom/null
export function validateBio(bio) {
  return bio == null || (typeof bio === "string" && bio.length <= 160);
}

// URL validering enkel
export function validateUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// Tekst maks lengde (f.eks alt-tekst)
export function validateMaxLength(text, max) {
  return typeof text === "string" && text.length <= max;
}

// Nummer innenfor range (inkludert nullables)
export function validateNumberRange(value, min, max, nullable = false) {
  if (nullable && (value === null || value === undefined)) return true;
  if (typeof value !== "number") return false;
  return value >= min && value <= max;
}

// Heltall innenfor range (inkludert nullables)
export function validateIntRange(value, min, max, nullable = false) {
  if (nullable && (value === null || value === undefined)) return true;
  if (!Number.isInteger(value)) return false;
  return value >= min && value <= max;
}

export function validateLogin({ email, password }) {
  const errors = {};

  if (!email || !validateNoroffEmail(email))
    errors.email =
      "E-posten må være en @noroff.no eller @stud.noroff.no adresse.";
  if (!password || !validatePassword(password))
    errors.password = "Passord må være minst 8 tegn";

  return errors;
}

export function validateRegister({ name, email, password }) {
  const errors = {};

  if (!name || !validateName(name))
    errors.name = "Navn må være alfanumerisk og maks 20 tegn";
  if (!email || !validateNoroffEmail(email))
    errors.email =
      "E-posten må være en @noroff.no eller @stud.noroff.no adresse.";
  if (!password || !validatePassword(password))
    errors.password = "Passord må være minst 8 tegn";

  return errors;
}

export function validateProfileUpdate({ avatar, banner, bio }) {
  const errors = {};

  if (avatar) {
    if (!validateUrl(avatar.url) || avatar.url.length > 300)
      errors.avatarUrl = "Avatar URL må være gyldig og maks 300 tegn";
    if (avatar.alt && !validateMaxLength(avatar.alt, 120))
      errors.avatarAlt = "Avatar alt-tekst maks 120 tegn";
  }

  if (banner) {
    if (!validateUrl(banner.url) || banner.url.length > 300)
      errors.bannerUrl = "Banner URL må være gyldig og maks 300 tegn";
    if (banner.alt && !validateMaxLength(banner.alt, 120))
      errors.bannerAlt = "Banner alt-tekst maks 120 tegn";
    if (!validateBio(bio)) errors.bio = "Bio kan være maks 160 tegn";
  }

  return errors;
}

export function validateVenue({
  name,
  description,
  media,
  price,
  maxGuests,
  rating,
  location,
}) {
  const errors = {};

  if (name && typeof name !== "string") errors.name = "Navn må være tekst";

  if (description && typeof description !== "string")
    errors.description = "Beskrivelse må være tekst";

  if (media) {
    if (!Array.isArray(media)) errors.media = "Media må være en liste";
    else if (media.length > 8) errors.media = "Maks 8 mediaelementer";
    else {
      media.forEach((item, i) => {
        if (!validateUrl(item.url) || item.url.length > 300)
          errors[`mediaUrl${i}`] = "Media URL må være gyldig og maks 300 tegn";
        if (item.alt && !validateMaxLength(item.alt, 120))
          errors[`mediaAlt${i}`] = "Media alt-tekst maks 120 tegn";
      });
    }
  }

  if (price !== undefined && !validateNumberRange(price, 0, 10000))
    errors.price = "Pris må være mellom 0 og 10000";

  if (maxGuests !== undefined && !validateIntRange(maxGuests, 1, 100))
    errors.maxGuests = "Maks gjester må være mellom 1 og 100";

  if (rating !== undefined && !validateNumberRange(rating, 0, 5))
    errors.rating = "Rating må være mellom 0 og 5";

  if (location) {
    if (
      location.lat !== undefined &&
      !validateNumberRange(location.lat, -90, 90, true)
    )
      errors.lat = "Lat må være mellom -90 og 90";
    if (
      location.lng !== undefined &&
      !validateNumberRange(location.lng, -180, 180, true)
    )
      errors.lng = "Lng må være mellom -180 og 180";
  }

  return errors;
}
