import { initializeApp } from "firebase/app";
import { collection as getCollection, CollectionReference, DocumentData, Firestore, getFirestore } from "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

export const app = initializeApp(config);
export const db = getFirestore(app);

export const collection = <T=DocumentData>(db: Firestore, path: string) => {
  return getCollection(db, path) as CollectionReference<T>
}

export const usersRef = collection(db, 'users');

export const userID = "super"; // TODO: for testing purposes
