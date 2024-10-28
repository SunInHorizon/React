import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBAMq378ywoSq4z8qFNxJu92EVON54ejZs",
  authDomain: "form-1cdd8.firebaseapp.com",
  databaseURL: "https://form-1cdd8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "form-1cdd8",
  storageBucket: "form-1cdd8.appspot.com",
  messagingSenderId: "194448504691",
  appId: "1:194448504691:web:c46ffb8bd8ace28e8eb706",
  measurementId: "G-N1NBE0QL69"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
