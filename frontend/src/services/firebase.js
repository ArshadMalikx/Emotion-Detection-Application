import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOL7_YgR2DlLz_nnsth5fP3vlK1GvUsHM",
    authDomain: "facereq-5e1c7.firebaseapp.com",
    projectId: "facereq-5e1c7",
    storageBucket: "facereq-5e1c7.appspot.com",
    messagingSenderId: "570287634450",
    appId: "1:570287634450:web:9b2cb2347cb6a0ad1080cb",
    measurementId: "G-WQ1R9JC5JL"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support persistence.');
    }
}); 