import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const adminConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'ticket-sale-aaea7.firebaseapp.com',
  projectId: 'ticket-sale-aaea7',
  storageBucket: 'ticket-sale-aaea7.appspot.com',
  messagingSenderId: process.env.SENDER_ID,
  appId: '1:775061735986:web:29570eae9e5b392f4d8a2b',
};

export const app = initializeApp(adminConfig);
export const auth = getAuth();
export const initializeSecondApp = (config: FirebaseOptions, name: string): FirebaseApp => {
  let secondApp = initializeApp(config, name);
  return secondApp;
};

export const db = getFirestore(app);
