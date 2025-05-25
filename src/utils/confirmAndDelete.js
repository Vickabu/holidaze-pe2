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
      "Feil ved sletting: " +
        (err.errors?.[0]?.message || err.message || "Ukjent feil"),
    );
    return false;
  }
}
