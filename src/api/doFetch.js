import { API_KEY } from "./constant";

export const doFetch = async (url, options = {}) => {
  try {
    const token = localStorage.getItem("accessToken"); // eller sessionStorage
    const mergedHeaders = {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers: mergedHeaders,
    });

    if (!response.ok) {
      throw await response.json();
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return await response.json();
    }

    return {};
  } catch (error) {
    console.error("doFetch error:", error);
    throw error;
  }
};
