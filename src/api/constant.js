/**
 * Base URL for all API requests.
 * Points to the Noroff API v2.
 * @constant {string}
 */

export const API_BASE = "https://v2.api.noroff.dev";

/**
 * API key used for authentication with the Noroff API.
 * @constant {string}
 */

export const API_KEY = "f4c38447-4194-4ac1-a305-7dbbe85477de";

/**
 * Endpoints related to authentication (login, registration, API key creation).
 * @constant {Object}
 * @property {string} LOGIN - Endpoint for logging in a user.
 * @property {string} REGISTER - Endpoint for registering a new user.
 * @property {string} CREATE_API_KEY - Endpoint for creating a new API key.
 */

export const API_AUTH = {
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  CREATE_API_KEY: `${API_BASE}/auth/create-api-key`,
};

/**
 * Endpoints specific to the Holidaze application.
 * @constant {Object}
 * @property {string} PROFILES - Endpoint for user profile data.
 * @property {string} VENUES - Endpoint for venue data (create, read, update, delete).
 * @property {string} BOOKINGS - Endpoint for booking data.
 * @property {string} SEARCH_VENUES - Endpoint for searching venues.
 */

export const API_HOLIDAZE = {
  PROFILES: `${API_BASE}/holidaze/profiles`,
  VENUES: `${API_BASE}/holidaze/venues`,
  BOOKINGS: `${API_BASE}/holidaze/bookings`,
  SEARCH_VENUES: `${API_BASE}/holidaze/venues/search`,
};
