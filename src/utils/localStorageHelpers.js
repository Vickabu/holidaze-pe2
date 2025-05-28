const STORAGE_KEYS = {
  token: "accessToken",
  login: "isLoggedIn",
  user: "userInfo",
};

/**
 * Saves user data to localStorage.
 * @param {Object} data
 */
export function saveUserToStorage(data) {
  if (!data || typeof data !== "object") return;

  const { accessToken, name, email, bio, avatar, banner, venueManager } = data;

  if (accessToken) {
    localStorage.setItem(STORAGE_KEYS.token, accessToken);
    localStorage.setItem(STORAGE_KEYS.login, "true");

    const userInfo = {
      name,
      email,
      bio,
      avatar,
      banner,
      venueManager,
    };

    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userInfo));
  }
}

/**
 * Clears all user-related data from localStorage.
 */
export function clearUserFromStorage() {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}
