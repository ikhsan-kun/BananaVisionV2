import { signInWithGoogleAndGetIdToken } from "../utils/firebaseClient";
import BASE_URL from "../utils/config";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/google`,
  GET_USER: `${BASE_URL}/auth/profile`,
  UPDATE_USER: `${BASE_URL}/auth/profile`,
};

export const login = async () => {
  const response = await fetch(API_ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};

export const register = async () => {
  const response = await fetch(API_ENDPOINTS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};

export const getUser = async (token) => {
  const response = await fetch(API_ENDPOINTS.GET_USER, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

// Enhanced Google login with better error handling
export const loginWithGoogle = async () => {
  try {
    console.log("🔵 [FRONTEND] Starting Google sign-in...");

    // Get idToken from Firebase
    const idToken = await signInWithGoogleAndGetIdToken();

    if (!idToken) {
      throw new Error("Failed to get Firebase token");
    }

    console.log("✅ [FRONTEND] Firebase token received");
    console.log("🔵 [FRONTEND] Sending to backend...");

    // Send to backend
    const res = await fetch(`${BASE_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });

    console.log("📥 [FRONTEND] Backend response status:", res.status);

    // Parse response
    const data = await res.json();

    console.log("📦 [FRONTEND] Backend response data:", data);

    // Check if request was successful
    if (!res.ok) {
      throw new Error(data.message || `Server error: ${res.status}`);
    }

    // Validate response structure
    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    // Check if we have user and token
    const userData = data.data?.user || data.user;
    const token = data.data?.token || data.token;

    if (!userData || !token) {
      console.error("❌ [FRONTEND] Invalid response structure:", data);
      throw new Error("Invalid response from server - missing user or token");
    }

    console.log("✅ [FRONTEND] Login successful:", userData.email);

    return {
      success: true,
      user: userData,
      token: token,
      message: data.message || "Login successful",
    };
  } catch (err) {
    console.error("❌ [FRONTEND] Login error:", err);

    // Provide more helpful error messages
    if (err.message.includes("popup")) {
      throw new Error("Popup diblokir. Mohon izinkan popup untuk login.");
    } else if (
      err.message.includes("network") ||
      err.message.includes("fetch")
    ) {
      throw new Error("Koneksi gagal. Periksa koneksi internet Anda.");
    } else if (err.message.includes("Firebase")) {
      throw new Error("Autentikasi Firebase gagal. Coba lagi.");
    }

    throw err;
  }
};
