// utils/handleLogin.js
import { API_AUTH } from "./constant";
import { doFetch } from "./doFetch";

export async function handleLogin({ email, password, role }) {
  const isManager = role === "manager";
  const loginUrl = `${API_AUTH.LOGIN}${isManager ? "?_holidaze=true" : ""}`;

  try {
    const response = await doFetch(loginUrl, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const { accessToken, name, avatar, banner, venueManager } = response.data;

    // Sjekk: prøver å logge inn som manager, men er ikke det
    if (isManager && !venueManager) {
      return {
        success: false,
        message:
          "Denne brukeren er ikke registrert som Venue Manager. Registrer deg som det for å få tilgang.",
      };
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name, email, avatar, banner, venueManager }),
    );

    return { success: true, user: response.data };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      success: false,
      message: error.message || "Ukjent feil under innlogging",
    };
  }
}
