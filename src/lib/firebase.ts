import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../../firebase-applet-config.json";

if (!firebaseConfig || !firebaseConfig.apiKey) {
  console.error("Firebase configuration is missing or invalid. Please check firebase-applet-config.json.");
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = (firebaseConfig as any).firestoreDatabaseId 
  ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
  : getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics is only available in browser environments
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;
