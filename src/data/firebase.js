import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDVYc13kAHy3PcnrVl1cqY7MLRekAZB5vA",
  authDomain: "omc-fbpm-11286.firebaseapp.com",
  projectId: "omc-fbpm-11286",
  storageBucket: "omc-fbpm-11286.appspot.com",
  messagingSenderId: "279904487180",
  appId: "1:279904487180:web:65c72af03fb9ab5ff36b29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;