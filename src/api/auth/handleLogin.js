import { API_AUTH } from "../constant";
import { doFetch } from "../doFetch";

/**
 * @typedef {Object} LoginSuccess
 * @property {true} success - Indicates the login was successful.
 * @property {Object} user - The logged-in user's data.
 *
 * @typedef {Object} LoginFailure
 * @property {false} success - Indicates the login failed.
 * @property {string} message - The error message.
 *
 * Handles user login by sending email and password to the authentication API.
 * Optionally appends a query parameter if the role is "manager".
 *
 * @param {Object} params - The login parameters.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - The user's password.
 * @param {string} [params.role] - Optional user role, e.g., "manager".
 * @returns {Promise<LoginSuccess | LoginFailure>} Result of the login attempt.
 */
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
          "This user is not registered as a Venue Manager. Please register as one to gain access.",
      };
    }

    return { success: true, user: data };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      success: false,
      message: error.message || "Unknown error during login",
    };
  }
}
