/**
 * Validates whether the email is a valid Noroff email.
 * @param {string} email
 * @returns {boolean}
 */
export function validateNoroffEmail(email) {
  const re = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  return re.test(email);
}

/**
 * Validates password length.
 * @param {string} password
 * @returns {boolean}
 */
export function validatePassword(password) {
  return typeof password === "string" && password.length >= 8;
}

/**
 * Validates name as alphanumeric and max 20 characters.
 * @param {string} name
 * @returns {boolean}
 */
export function validateName(name) {
  const re = /^[\w]+$/;
  return typeof name === "string" && re.test(name) && name.length <= 20;
}

/**
 * Validates that bio is a string with max 160 characters.
 * @param {string|null} bio
 * @returns {boolean}
 */
export function validateBio(bio) {
  return bio == null || (typeof bio === "string" && bio.length <= 160);
}

/**
 * Checks if a URL is valid and HTTP/HTTPS.
 * @param {string} url
 * @returns {boolean}
 */
export function validateUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Validates max length of a string.
 * @param {string} text
 * @param {number} max
 * @returns {boolean}
 */
export function validateMaxLength(text, max) {
  return typeof text === "string" && text.length <= max;
}

/**
 * Validates if a number is within range.
 * @param {number|null} value
 * @param {number} min
 * @param {number} max
 * @param {boolean} [nullable=false]
 * @returns {boolean}
 */
export function validateNumberRange(value, min, max, nullable = false) {
  if (nullable && (value === null || value === undefined)) return true;
  return typeof value === "number" && value >= min && value <= max;
}

/**
 * Validates if an integer is within range.
 * @param {number|null} value
 * @param {number} min
 * @param {number} max
 * @param {boolean} [nullable=false]
 * @returns {boolean}
 */
export function validateIntRange(value, min, max, nullable = false) {
  if (nullable && (value === null || value === undefined)) return true;
  return Number.isInteger(value) && value >= min && value <= max;
}

/**
 * Validates login input.
 * @param {{ email: string, password: string }} param0
 * @returns {Object<string, string>}
 */
export function validateLogin({ email, password }) {
  const errors = {};

  if (!email || !validateNoroffEmail(email)) {
    errors.email = "Email must be @noroff.no or @stud.noroff.no";
  }
  if (!password || !validatePassword(password)) {
    errors.password = "Password must be at least 8 characters long";
  }

  return errors;
}

/**
 * Validates registration input.
 * @param {{ name: string, email: string, password: string }} param0
 * @returns {Object<string, string>}
 */
export function validateRegister({ name, email, password }) {
  const errors = {};

  if (!name || !validateName(name)) {
    errors.name = "Name must be alphanumeric and max 20 characters";
  }
  if (!email || !validateNoroffEmail(email)) {
    errors.email = "Email must be @noroff.no or @stud.noroff.no";
  }
  if (!password || !validatePassword(password)) {
    errors.password = "Password must be at least 8 characters long";
  }

  return errors;
}

/**
 * Validates profile update input.
 * @param {{ avatar?: { url: string, alt?: string }, banner?: { url: string, alt?: string }, bio?: string }} param0
 * @returns {Object<string, string>}
 */
export function validateProfileUpdate({ avatar, banner, bio }) {
  const errors = {};

  if (avatar) {
    if (!validateUrl(avatar.url) || avatar.url.length > 300) {
      errors.avatarUrl = "Avatar URL must be valid and max 300 characters";
    }
    if (avatar.alt && !validateMaxLength(avatar.alt, 120)) {
      errors.avatarAlt = "Avatar alt text max 120 characters";
    }
  }

  if (banner) {
    if (!validateUrl(banner.url) || banner.url.length > 300) {
      errors.bannerUrl = "Banner URL must be valid and max 300 characters";
    }
    if (banner.alt && !validateMaxLength(banner.alt, 120)) {
      errors.bannerAlt = "Banner alt text max 120 characters";
    }
  }

  if (!validateBio(bio)) {
    errors.bio = "Bio can be max 160 characters";
  }

  return errors;
}

/**
 * Validates a venue object.
 * @param {{
 *  name?: string,
 *  description?: string,
 *  media?: { url: string, alt?: string }[],
 *  price?: number,
 *  maxGuests?: number,
 *  rating?: number,
 *  location?: { lat?: number, lng?: number }
 * }} param0
 * @returns {Object<string, string>}
 */
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

  if (name && typeof name !== "string") {
    errors.name = "Name must be a string";
  }

  if (description && typeof description !== "string") {
    errors.description = "Description must be a string";
  }

  if (media) {
    if (!Array.isArray(media)) {
      errors.media = "Media must be an array";
    } else if (media.length > 8) {
      errors.media = "Maximum 8 media items allowed";
    } else {
      media.forEach((item, i) => {
        if (!validateUrl(item.url) || item.url.length > 300) {
          errors[`mediaUrl${i}`] =
            "Media URL must be valid and max 300 characters";
        }
        if (item.alt && !validateMaxLength(item.alt, 120)) {
          errors[`mediaAlt${i}`] = "Media alt text max 120 characters";
        }
      });
    }
  }

  if (price !== undefined && !validateNumberRange(price, 0, 10000)) {
    errors.price = "Price must be between 0 and 10,000";
  }

  if (maxGuests !== undefined && !validateIntRange(maxGuests, 1, 100)) {
    errors.maxGuests = "Max guests must be between 1 and 100";
  }

  if (rating !== undefined && !validateNumberRange(rating, 0, 5)) {
    errors.rating = "Rating must be between 0 and 5";
  }

  if (location) {
    if (
      location.lat !== undefined &&
      !validateNumberRange(location.lat, -90, 90, true)
    ) {
      errors.lat = "Latitude must be between -90 and 90";
    }
    if (
      location.lng !== undefined &&
      !validateNumberRange(location.lng, -180, 180, true)
    ) {
      errors.lng = "Longitude must be between -180 and 180";
    }
  }

  return errors;
}
