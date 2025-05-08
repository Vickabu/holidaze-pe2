// utils/handleRegister.js
import { API_AUTH } from "./constant";
import { doFetch } from "./doFetch";

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
      // Auto-login (valgfritt)
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data));
      return { success: true, user: response.data };
    }

    throw new Error("Registrering feilet.");
  } catch (error) {
    console.error("Register error:", error.message);
    return { success: false, message: error.message };
  }
}
