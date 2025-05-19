// utils/handleRegister.js
import { API_AUTH } from "../constant";
import { doFetch } from "../doFetch";
import { saveUserToStorage } from "../../utils/localStorageHelpers";

export async function handleRegister({ name, email, password, role }) {
  const url = API_AUTH.REGISTER;

  try {
    const response = await doFetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        venueManager: role === "manager",
      }),
    });

    if (response?.accessToken) {
      saveUserToStorage(response);
      return { success: true, user: response.data };
    }

    throw new Error("Registrering feilet.");
  } catch (error) {
    console.error("Register error:", error.message);
    return {
      success: false,
      message: error.message || "Ukjent feil under registrering",
    };
  }
}
