import { API_KEY } from "./constant";

export const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw await response.json(); // kast feilmeldingene som de er
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return {};
  } catch (error) {
    console.error("doFetch error:", error);
    throw error;
  }
};
