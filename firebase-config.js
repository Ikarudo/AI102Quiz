// ─────────────────────────────────────────────────────────────────
//  STEP 1: Paste your Firebase project config here
//  Go to: Firebase Console → Project Settings → Your apps → SDK setup
// ─────────────────────────────────────────────────────────────────
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCrER2ggdPTCtXF92vTJDko42IT6x4SWwA",
  authDomain: "az102quiz.firebaseapp.com",
  projectId: "az102quiz",
  storageBucket: "az102quiz.firebasestorage.app",
  messagingSenderId: "248994147807",
  appId: "1:248994147807:web:848e41d57b6cdf084fa86a",
  measurementId: "G-26LC5TQJW1"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ─────────────────────────────────────────────────────────────────
//  STEP 2: Set your admin password for the /admin page
// ─────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "Say_My_Name123456";



