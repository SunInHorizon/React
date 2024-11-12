import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAID7XG6rIU8fg5FffQN0JRtBky-jEI5WE",
  authDomain: "form-ec6ad.firebaseapp.com",
  projectId: "form-ec6ad",
  storageBucket: "form-ec6ad.firebasestorage.app",
  messagingSenderId: "463701507262",
  appId: "1:463701507262:web:c6efa9a853fa89946972ef",
  measurementId: "G-EH1QX33G3J"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
