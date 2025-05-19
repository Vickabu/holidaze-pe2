// utils/handleLogin.js
import { API_AUTH } from "../constant";
import { doFetch } from "../doFetch";
import { saveUserToStorage } from "../../utils/localStorageHelpers";

export async function handleLogin({ email, password, role }) {
  const isManager = role === "manager";
  const loginUrl = `${API_AUTH.LOGIN}${isManager ? "?_holidaze=true" : ""}`;

  try {
    const response = await doFetch(loginUrl, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = response.data;

    if (isManager && !data.venueManager) {
      return {
        success: false,
        message:
          "Denne brukeren er ikke registrert som Venue Manager. Registrer deg som det for å få tilgang.",
      };
    }

    saveUserToStorage(data);

    return { success: true, user: data };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      success: false,
      message: error.message || "Ukjent feil under innlogging",
    };
  }
}
