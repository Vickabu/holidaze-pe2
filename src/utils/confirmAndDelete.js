/**
 * Prompts user for confirmation and attempts to delete a resource via the provided `remove` function.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.message - Confirmation message to show to the user.
 * @param {string} params.url - The API endpoint URL for the delete request.
 * @param {string} params.accessToken - Bearer token for authorization header.
 * @param {function} params.remove - Async function to perform the delete request.
 *                                  It should accept (url, headers) as arguments.
 * @returns {Promise<boolean>} Returns true if deletion was successful, false otherwise or if cancelled.
 */
export async function confirmAndDelete({ message, url, accessToken, remove }) {
  const confirmed = window.confirm(message);
  if (!confirmed) return false;

  try {
    await remove(url, {
      Authorization: `Bearer ${accessToken}`,
    });
    return true;
  } catch (err) {
    alert(
      "Error deleting item: " +
        (err.errors?.[0]?.message || err.message || "Unknown error"),
    );
    return false;
  }
}
