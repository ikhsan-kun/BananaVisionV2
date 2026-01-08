import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

let authInstance = null;

function initFirebase() {
  if (authInstance) return authInstance;

  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  if (!config.apiKey || !config.authDomain || !config.projectId) {
    throw new Error(
      "Firebase client configuration is missing. Set VITE_FIREBASE_* env vars."
    );
  }

  const app = initializeApp(config);
  authInstance = getAuth(app);
  return authInstance;
}

export async function signInWithGoogleAndGetIdToken() {
  const auth = initFirebase();
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  if (!user) throw new Error("No user returned from Firebase sign-in");

  const idToken = await user.getIdToken();
  return idToken;
}

// New: try popup first; if popup is blocked, fallback to redirect flow
export async function signInWithGooglePopupOrRedirect() {
  const auth = initFirebase();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (!user) throw new Error("No user returned from Firebase sign-in");
    const idToken = await user.getIdToken();
    return idToken;
  } catch (err) {
    // if popup is blocked, fall back to redirect-based flow
    const code = err && (err.code || "");
    const message = err && (err.message || "");
    if (
      code === "auth/popup-blocked" ||
      code === "auth/cancelled-popup-request" ||
      message.toLowerCase().includes("popup")
    ) {
      // Start redirect sign-in. The browser will navigate away; handle result on app init with handleRedirectResult().
      await signInWithRedirect(auth, provider);
      return null; // caller should wait for redirect result on next load
    }
    throw err;
  }
}

export async function handleRedirectResult() {
  const auth = initFirebase();
  try {
    const result = await getRedirectResult(auth);
    if (!result || !result.user) return null;
    const idToken = await result.user.getIdToken();
    return idToken;
  } catch (err) {
    console.warn("Firebase redirect sign-in failed:", err);
    return null;
  }
}

export default {
  signInWithGoogleAndGetIdToken,
  signInWithGooglePopupOrRedirect,
  handleRedirectResult,
};
