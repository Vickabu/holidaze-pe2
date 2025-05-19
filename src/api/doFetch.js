import { API_KEY } from "./constant";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const doFetch = async (url, options = {}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
      ...getAuthHeaders(),
      ...(options.headers || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
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
