// utils/handleLogin.js
import { API_AUTH } from "./constant";
import { doFetch } from "./doFetch";

export async function handleLogin({ email, password, role }) {
  const url = API_AUTH.LOGIN;

  try {
    const response = await doFetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response && response.accessToken) {
      const isVenueManager = response.data?.venueManager;
      if (
        (role === "manager" && !isVenueManager) ||
        (role === "guest" && isVenueManager)
      ) {
        throw new Error(
          "Brukerrollen stemmer ikke overens med kontoinnstillingene.",
        );
      }

      // Du kan lagre brukerdata/token her (eks. localStorage)
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data));
      return { success: true, user: response.data };
    }

    throw new Error("Ugyldig respons fra serveren.");
  } catch (error) {
    console.error("Login error:", error.message);
    return { success: false, message: error.message };
  }
}
