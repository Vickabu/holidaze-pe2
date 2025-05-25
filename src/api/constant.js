export const API_BASE = "https://v2.api.noroff.dev";
export const API_KEY = "f4c38447-4194-4ac1-a305-7dbbe85477de";

export const API_AUTH = {
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  CREATE_API_KEY: `${API_BASE}/auth/create-api-key`,
};

export const API_HOLIDAZE = {
  PROFILES: `${API_BASE}/holidaze/profiles`,
  VENUES: `${API_BASE}/holidaze/venues`,
  BOOKINGS: `${API_BASE}/holidaze/bookings`,
  SEARCH_VENUES: `${API_BASE}/holidaze/venues/search`,
};
