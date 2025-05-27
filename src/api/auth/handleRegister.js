import { API_AUTH } from "../constant";
import { doFetch } from "../doFetch";

/**
 * Handles user registration by sending user details to the registration API.
 * Sets `venueManager` to true if the role is "manager".
 *
 * @param {Object} params - The registration parameters.
 * @param {string} params.name - The user's full name.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's chosen password.
 * @param {string} params.role - The role of the user, e.g., "manager".
 * @returns {Promise<Object>} The result of the registration attempt.
 *   If successful, returns `{ success: true, user: Object }`.
 *   If unsuccessful, returns `{ success: false, message: string }`.
 */

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

    if (response && !response.error) {
      return { success: true, user: response };
    }

    throw new Error(response.message || "Registration failed.");
  } catch (error) {
    console.error("Register error:", error.message);
    return {
      success: false,
      message: error.message || "Unknown error during registration",
    };
  }
}
