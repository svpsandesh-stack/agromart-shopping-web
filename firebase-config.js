import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDI_qQC8qzlNkGgHSJxXvVd3umX-PRDcHA",
  authDomain: "agromart-14042.firebaseapp.com",
  projectId: "agromart-14042",
  storageBucket: "agromart-14042.firebasestorage.app",
  messagingSenderId: "582631929109",
  appId: "1:582631929109:web:1ed79326e4bab3762e251c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
