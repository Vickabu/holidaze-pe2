export function saveUserToStorage(data) {
  const { accessToken, name, email, avatar, banner, venueManager } = data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ name, email, avatar, banner, venueManager }),
  );
}

export function clearUserFromStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userInfo");
}
