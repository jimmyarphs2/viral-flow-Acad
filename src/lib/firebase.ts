import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../../firebase-applet-config.json";

const isConfigValid = firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== "TODO_KEYHERE";

let app;
let auth: any;
let db: any;
let storage: any;
let googleProvider: any;
let analytics: any = null;

if (isConfigValid) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    
    const databaseId = (firebaseConfig as any).firestoreDatabaseId;
    db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    
    if (typeof window !== "undefined") {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    app = null;
  }
} else {
  console.warn("Firebase configuration is missing or invalid. Firebase features will be disabled.");
}

export { auth, db, storage, googleProvider, analytics };
export const isFirebaseEnabled = !!app;
export default app;
