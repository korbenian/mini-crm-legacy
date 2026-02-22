import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyB7Oeh8A-avtdw1zeYXK4t-Aivqn8qaRbk',
  authDomain: 'mini-crm-59748.firebaseapp.com',
  projectId: 'mini-crm-59748',
  storageBucket: 'mini-crm-59748.appspot.com', 
  messagingSenderId: '935891437255',
  appId: '1:935891437255:web:981f1428d16d1f4271e0e2',
  measurementId: 'G-KWQPND2BB0'
};

// Initialize Firebase (Avoid re-initializing if already done)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics safely
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};