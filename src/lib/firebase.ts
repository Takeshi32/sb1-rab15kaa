import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBkvGAG6yfk0jaTr-i3eT23h7jgVsB66aA",
  authDomain: "rfid-b5ac7.firebaseapp.com",
  projectId: "rfid-b5ac7",
  storageBucket: "rfid-b5ac7.appspot.com",
  messagingSenderId: "556041528196",
  appId: "1:556041528196:web:caef2b234196a2be40f3d1",
  measurementId: "G-02Q711XFCN"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Connect to emulators in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}