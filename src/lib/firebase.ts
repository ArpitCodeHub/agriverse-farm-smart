import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "AIzaSyDnW6Jlsvy4fNdfvwQ0LPjlYSCLTgQIQ4o",
  authDomain: "agriverse-5af0d.firebaseapp.com",
  projectId: "agriverse-5af0d",
  storageBucket: "agriverse-5af0d.firebasestorage.app",
  messagingSenderId: "695900915133",
  appId: "1:695900915133:web:c212a259c49ed0ec93fed4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
